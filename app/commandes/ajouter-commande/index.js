import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import EnregistrerBtn from '../../../components/buttons/EnregistrerBtn'
import Dropdown from '../../../components/dropdown/DropdownCustom'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import { Button } from 'react-native';

import Field from '../../../components/field/Field'

import { Text } from 'react-native';
import { TextInput } from 'react-native';
import { COLORS, FONT, icons, images } from '../../../constants'
import * as Yup from 'yup';
import { useAuth } from '../../../context/auth'
import { useLocalSearchParams, useRouter } from 'expo-router'

import { Formik } from 'formik';
import { get_myAllPacks, get_myPacks, get_packs_filtre } from '../../api/axios_pack'
import { add_commande, get_commande_by_id, update_commande } from '../../api/axios_command'
import { handleGeocode } from '../../api/axios_geocoding';
import { popupErrorWithConfirmation, popupSuccessMessage } from '../../../utils/Utils';
import styles from './ajouter.style';



const AddCommande = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [latitude,setLatitude] =useState('')
  const [longitude,setLongitude] =useState('')


  const [packs,setPacks] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState('Default Address');
  const [selectedPack,setSelectedPack] = useState({
    id:'',
    name:'',
    quantite:0,
    prixUnitaire:0
  });

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    pack: Yup.number()
    .required('Merci de choisir un commande')
    .min(1, 'Number must be at least 1'),
    address: Yup.string()
      .min(2, 'Too Short!') 
      .max(200, 'Too Long!')
      .required("merci d'entrer l'adresse")
      ,
    
    phone:Yup.number().min(10,'test').required("Merci d'entrer numéro de télèphone"),
  
    quantite:Yup.number().min(1,'test').max(selectedPack.quantite,'worked').required("Merci d'entrer la quantitée"),
    price:Yup.number()
            .min(1,'test')
            .required("merci d'entrer le prix")
  });
  

  const [commande,setCommande] = useState({
    id:'',
    owner:'',
    address: '',
    phone:'',
    quantite:'',
    price:'',
    pack:''
  })

  const { userInfo } = useAuth();

  const router = useRouter();
  const params = useLocalSearchParams();

  const { id } = params;


  const getPacks = async() => {
    await get_packs_filtre(userInfo.id)
     .then(({data})=>{
        setPacks(data.data)
       
     }) 
     .catch(err => {console.log(err);})
  }



  const ch = (item) => {
    setSelectedPack({})
    setSelectedPack({
      id:item.id,
      name:item.name,
      quantite:item.quantite,
      prixUnitaire:item.prixUnitaire
    })
  }


  useEffect(()=>{
    getPacks()

    if (id) {
      
      get_commande_by_id(id).then(({data}) => {
        
        setCommande({
          id:data.data.id, 
          address: data.data.owner,
          address: data.data.address,
          phone:data.data.phone,
          quantite:data.data.quantite,
          price:data.data.price,
          pack:data.data.pack.id 
        })
        setSelectedPack({
          id:data.data.pack.id,
          name:data.data.pack.name,
          quantite:data.data.pack.quantite,
          prixUnitaire:data.data.pack.prixUnitaire
        });

        setLongitude(data.data.longitude);
        setLatitude(data.data.latitude)

      }).catch(err => {
        console.log(err);
      })
    }

  },[])

 
  const handleSubmit = async (values) =>{
    if (!id) {
     await handleGeocode(values.address).then((response) => {
      const { results } = response.data;
      console.log(results[0].geometry.location);
      if (results[0].geometry.location) {
        const { lat, lng } = results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
      
      } else {
      //   setError('No results found.');
      popupErrorWithConfirmation('No results found.')
      return;
      }
      })
      .catch((error) => {
        // setError('Error occurred while geocoding.');
        console.error(error);
        popupErrorWithConfirmation('Error occurred while geocoding.')
        return;
        
      });
     await add_commande({...values,latitude : latitude , longitude : longitude,client:userInfo.id})
      .then(({data})=>{
        if (data.status === 200) {
       
                popupSuccessMessage("Votre commandes "+values.address + " a ajouté avec succès")
                router.replace("/commandes")
          }
        }).catch((err)=>{console.log(err);})
     }
    else{
      
      console.log(values);
      await update_commande(commande.id,{...values,client:userInfo.id}).then((data)=>{
        if (data.status === 200) {
              popupSuccessMessage("Votre commande "+values.address + " a modifié avec succès")
              router.replace("/commandes")
          }
        }).catch((err)=>{console.log(err);})
    }
    
  }

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>AJOUter une commande</Text>
    </View>

   
    

    <Formik enableReinitialize initialStatus={[commande,selectedPack]}
          initialValues={{
              owner:'TEST 01',
              address: commande.address,
              phone:commande.phone,
              quantite:String(commande.quantite),
              price:String(commande.prixUnitaire),
              pack:selectedPack.id
          }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={handleSubmit}
            >
        {({values,errors,touched,handleChange,
          setFieldTouched,isValid,handleSubmit})=>(


            <>
            <View style={styles.content}>
              <Text style={styles.label}>Choissisez une colis:</Text>

              <Dropdown data={packs} id={values.pack}
                     handleChange={handleChange('pack')} 
                     handleChangeItem={ch} />
                     {errors.pack &&
                      <Text style={{fontSize:12,color:'#FF0D10',}}>{errors.pack}</Text>}

               <View style={{padding:5,marginLeft:'auto'}}>
                       <Text style={{marginBottom:2,fontWeight:'bold',textAlign:'right',fontStyle:'italic'}} >Prix Unitaire : <Text style={{color:COLORS.secondary}}>{selectedPack.prixUnitaire} DH</Text></Text>
                       <Text style={{fontWeight:'bold',textAlign:'right',fontStyle:'italic'}} >Quantite : <Text style={{color:COLORS.secondary}}>{selectedPack.quantite}</Text></Text>

                    </View>

              <Field label="Quantité:" name="quantite" /> 
              <View style={{padding:5,marginLeft:'auto'}}>
                      <Text style={{fontWeight:'bold',textAlign:'right',fontStyle:'italic'}} > Prix Total : <Text style={{color:COLORS.secondary}}>{values.price = selectedPack.prixUnitaire  * values.quantite} DH</Text></Text>
              </View>

              {/* <Field label="Nom du titulaire du commande:" name="owner" />  */}
              <Field label="Télèphone:" name="phone" /> 
              <Text style={styles.label}>Adresse</Text>
              { touched.address && errors.address &&
                      <Text style={{fontSize:12,color:'#FF0D10',}}>{errors.address}</Text>}

            {commande.address && <Text style={styles.address}>Current : {commande.address}</Text> }
            <GooglePlacesAutocomplete
              styles={{textInput:{backgroundColor:'rgb(220,220, 220)',color:'#000'}}}
             // textInputProps={{value: commande.address ? commande.address : ''}} 
              placeholder='Search'
              onPress={(data, details = null) => {
                // handlePlaceSelect(data.description);
                handleChange('address')(data.description);
              }}
              query={{
                key: 'AIzaSyAsGOSLFI83LZqcFOda1zltJ9DfUuLCHyA',
                language: 'en',
              }}
            />



    
            </View>

            <View style={styles.footer}>
            <EnregistrerBtn btnIcon={icons.add} btnText={'ENREGISTRER'} isValid={isValid} handelButton={handleSubmit} />

            </View>
                    </>
                  )}
          
          </Formik>



   
  </View>
    
    )
}

export default AddCommande