import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { COLORS, FONT, icons, images } from '../../constants';
import Header from '../../components/headers/Header';
import Container from '../../components/container/Container';
import Field from '../../components/field/Field';
import { SafeAreaView } from 'react-native';
import EnregistrerBtn from '../../components/buttons/EnregistrerBtn';
import { useRouter } from 'expo-router';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Alert } from 'react-native';
import { useAuth } from '../../context/auth';


const DisplayingErrorMessagesSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required("merci d'entrer votre nom et prenom"),
    firstname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required("merci d'entrer votre nom et prenom"),
    lastname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required("merci d'entrer votre nom et prenom"),
    email:Yup.string()
                .email('Email invalide')
                .required("merci d'entrer votre email"),
    phone:Yup.string()
            .min(10,'Doit être exactement 10 chiffres')
            .max(10,'Doit être exactement 10 chiffres')
            .matches('^[0-9]+$','ne doit être que des chiffres')
            .required("merci d'entrer votre numero")
  });

const Profile = () => {
    const router = useRouter();
    const { userInfo } = useAuth()

    return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        <Formik enableReinitialize initialStatus={userInfo} 
            initialValues={{
                username: userInfo.username,
                firstname: userInfo.firstname,
                lastname: userInfo.firstname,
                email:userInfo.email,
                phone: String(userInfo.phone)

            }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={values => Alert.alert(JSON.stringify(values))}
            >
        {({values,errors,touched,handleChange,
        setFieldTouched,isValid,handleSubmit})=>(
            <View style={{flex:1,backgroundColor:'white',marginTop:25}}>
            <ScrollView style={styles.container}>
                <Header bg={images.menuBg} headerWidth={8} title={'Mon profile'} 
                    textSize={22} subTitle={'Vous pouvez changer votre information'}/>
                
                <Container pad={-15} padHor={10}>
                    <View style={styles.header}>
                        <Image style={styles.photo} source={images.profile} />
                        <Text style={styles.name}>Ayoub Essahat</Text>

                        <TouchableOpacity>
                            <Text style={styles.title}>Changer Votre image</Text>
                        </TouchableOpacity>
                    </View>

                    
                    <View style={styles.body}>
                        
                        <TouchableOpacity  style={styles.imageContainer} onPress={()=>router.push(`colis/`)}>
                            <Image style={styles.image} source={images.colis1}
                            resizeMode='contain'/>
                            <Text style={styles.imageText}>Colis: 100</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.imageContainer} onPress={()=>router.push(`commandes/`)}>
                            <Image style={styles.image} source={images.commande1}/>
                            <Text style={styles.imageText}>Commande: 150</Text>
                        </TouchableOpacity>
                        
                    </View>

                    <View style={styles.formBody}>

                        <Field label="Username:" name="username" />
                        <Field label="Nom:" name="firstname" /> 
                        <Field label="Prenom:" name="lastname" /> 
 
                        <Field label="Email:" name="email" /> 
                        <Field label="Telephone:" name="phone" /> 
                        
                                

                                
                    </View>



                </Container>
            </ScrollView>
                <EnregistrerBtn btnIcon={icons.add} btnText={'ENREGISTRER'} isValid={isValid} handelButton={handleSubmit} />
            </View>
        ) }

        </Formik>
    </SafeAreaView>
)
};

const styles = StyleSheet.create({
container: {
  flex: 1,
//   padding: 16,
//   marginTop:25,
  backgroundColor:'white'
},
header: {
  alignItems: 'center',
  marginBottom: 16,
  marginTop:20
},
photo: {
  width: 100,
  height: 100,
  borderRadius: 50,
},
name: {
  fontSize: 24,
  fontWeight: '600',
  fontFamily:FONT.bold,
  textTransform:'uppercase'
},
title: {
  fontSize: 14,
  color: COLORS.lightWhite,
  backgroundColor:COLORS.primary,
  fontFamily:FONT.medium,
  padding:2
},
body: {
    // alignItems: 'center',
    justifyContent:'center',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: '30%',
   
    padding: 5,
  },
  image: {
    borderRadius:10,
    width: '100%',
    height: 80,
  },
  imageText:{
    textAlign:'center',
    fontFamily:FONT.chelseaMarket,
    color:'#555',
    fontSize:14
  },
  formBody: {
    // // alignItems: 'center',
    // justifyContent:'center',
    padding: 30,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    marginBottom:30,
  }, 

});


export default Profile