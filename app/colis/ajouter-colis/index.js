import { View, Text, SafeAreaView, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, usePathname, useRouter, useSearchParams } from 'expo-router'
import { COLORS, FONT, SIZES, icons,images } from '../../../constants'
import { ImageBackground } from 'react-native'
import {  Ionicons } from '@expo/vector-icons'
import { Image } from 'react-native'
import FieldText from '../../../components/field/Field'
import { Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { TextInput } from 'react-native'
import EnregistrerBtn from '../../../components/buttons/EnregistrerBtn'
import Header from '../../../components/headers/Header'
import Container from '../../../components/container/Container'
import * as Yup from 'yup';
import { Field, Formik, useFormik } from 'formik';
import { useEffect } from 'react'
import { add_pack, get_all_categories, get_pack_by_id, update_pack } from '../../api/axios_pack'
import DropdownCustom from '../../../components/dropdown/DropdownCustom'
import { user_info } from '../../api/user_auth'
import { useAuth } from '../../../context/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { popupSuccessMessage, showToast, successToast } from '../../../utils/Utils'
import Toast from 'react-native-toast-message';
import ShowImage from '../../../components/image/ShowImage'
import { Dropdown } from 'react-native-element-dropdown'


const DisplayingErrorMessagesSchema = Yup.object().shape({
  categorie: Yup.number()
  .required('Number is required')
  .min(1, 'Number must be at least 1'),
  name: Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required("merci d'entrer une titre"),
  designation: Yup.string()
    .min(2, 'Too Short!')
    .max(500, 'Too Long!')
    .required("merci d'entrer une petite designation"),
  quantite:Yup.number().min(1,'test').required("Merci d'entrer la quantitée"),
  prixUnitaire:Yup.number()
          .min(1,'test')
          .required("merci d'entrer le prix chaque unitaire")
});


const AddColis = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories,setCategories] = useState([]);
  const [pack,setPack] = useState({
            id:'',
            image:'',
            name:'',
            designation: '',
            quantite:0,
            prixUnitaire:0,
            prixTotal:0,
            categorie:null,
        
        })

  const { userInfo,username } = useAuth()

  const params = useLocalSearchParams();
  const { id } = params;

  const handleImageUpload = async () => {
    try {
      const imagePickerOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      };

      const result = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);

      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };




  const handleSubmit =async (values) => {

      const formData = new FormData();
      formData.append('image', {
        uri: selectedImage,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      formData.append('name', values.name);
      formData.append('designation', values.designation);
      formData.append('quantite', values.quantite);
      formData.append('prixUnitaire',values.prixUnitaire );
      formData.append('prixTotal', values.prixTotal);
      formData.append('categorie', values.categorie);
      formData.append('client', userInfo.id);
 
      
      if (!id) {
        add_pack(formData).then(({data})=>{
          if (data.status === 200) {
                  popupSuccessMessage("Votre colis "+values.name + " a ajouté avec succès")
                  router.replace("/colis")
            }
          }).catch((err)=>{console.log(err);})
      }else{
         update_pack(pack.id,formData).then((data)=>{
          if (data.status === 200) {
                popupSuccessMessage("Votre colis "+values.name + " a modifié avec succès")
                router.replace("/colis")
            }
          }).catch((err)=>{console.log(err);})
      }
      
      
  }


  useEffect(()=>{
    
  },[])


  useEffect(()=>{
    get_all_categories().then(({data})=> {
      setCategories(data.data)
    })  
    
   
    if (id) {
      get_pack_by_id(id).then(({data}) => {
        setPack({
          id:data.data.id, 
          image:data.data.image,
          name:data.data.name,
          designation: data.data.designation,
          quantite: data.data.quantite,
          prixUnitaire: data.data.prixUnitaire,
          prixTotal:data.data.prixTotal,
          categorie:data.data.categorie.id, 
      })
      }).catch(err => {
        console.log(err);
      })
    }
    

  },[])

 

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white',marginTop:25}}>

    <Formik enableReinitialize  initialStatus={pack}
          initialValues={{
              image:pack.image,
              name:pack.name,
              designation: pack.designation,
              quantite:String(pack.quantite),
              prixUnitaire:String(pack.prixUnitaire),
              prixTotal:pack.prixTotal,
              categorie:pack.categorie,
          }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={handleSubmit}
            >
        {({values,errors,touched,handleChange,
          setFieldTouched,isValid,handleSubmit})=>(
          <View >

          <ScrollView>

        
        <Header bg={images.menuBg} headerWidth={4.5} title={'AJOUTER UN COLIS'} subTitle={'S\'il vous plais remplir formulaire suivant'}/>


          <Container pad={-50} padHor={10}>
 
          {/* <Button title="Show Toast" onPress={showToast} /> */}
          
            <View style={styles.avatarContainer}>
                    <Image
                    style={styles.avatar} 
                      source={{uri: selectedImage ?  selectedImage : 'https://images.pexels.com/photos/4498152/pexels-photo-4498152.jpeg'}}
                    />

                  <TouchableOpacity style={styles.changeAvatarButton} onPress={handleImageUpload}>
                    <Text style={styles.changeAvatarButtonText}>Changer l'image</Text>
                  </TouchableOpacity>
 
                  {/* <Button title="Select Image" onPress={handleFileUpload} /> */}
            </View>
             
                 <Text style={styles.label}>Choissisez une categorie:</Text>

                  <Dropdown
                  style={styles.dropdown}
                    // label="Select an option"
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.itemTextStyle}
                    data={categories}
                    value={values.categorie}
                    onChange={(val)=>{
                      values.categorie = val.id
                      }
                    }
                    labelField="name"
                    valueField="id"
                  />
    
             
                  {errors.categorie && <Text style={{fontSize:12,color:'#FF0D10',}}>{errors.categorie}</Text>}
                  <FieldText label="Titre:" name="name" /> 
                  <FieldText label="Designation:" name="designation" /> 
                  <FieldText label="Quantité:" name="quantite" /> 
                  <FieldText label="Prix Unitaire:" name="prixUnitaire" /> 
                  
  
              <View style={{padding:20,marginLeft:'auto'}}>
                <Text style={{marginBottom:2,fontWeight:'bold',textAlign:'right',fontStyle:'italic'}} > Prix Total : <Text style={{color:COLORS.secondary}}>{values.prixTotal = values.prixUnitaire * values.quantite} DH</Text></Text>
                {/* <Text style={{marginBottom:2,fontWeight:'bold',textAlign:'right',fontStyle:'italic'}} > Après les frais : <Text style={{color:COLORS.secondary}}> 100 DH</Text></Text> */}
              </View>

          </Container>
        
      
        
        
          </ScrollView>

          <EnregistrerBtn btnIcon={icons.add} btnText={'ENREGISTRER'} isValid={isValid} handelButton={handleSubmit} />

           
          </View>
           )}
      </Formik>
      <Toast/>
    </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
 

  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: '#fff',
    fontSize: 14,
    backgroundColor:"black",
    padding:3,
    borderRadius:5,
    marginBottom:2
  },
  
  label:{
    marginTop:30,
    marginBottom:5,
    fontFamily:FONT.medium,
    
  },

  dropdown: {
    height: 50,
    borderColor: 'gray',
  //   borderWidth: 0.2,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'rgb(220,220, 220)', 
  },

})

export default AddColis