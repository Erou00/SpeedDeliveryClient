import { View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import { COLORS, FONT } from '../../constants';
import LoginBtn from '../../components/buttons/LoginBtn';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import { Formik } from 'formik';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { client_register } from '../api/user_auth';
import { useAuth } from "../../context/auth";


const DisplayingErrorMessagesSchema = Yup.object().shape({
  username: Yup.string()
      .min(5, 'Too Short!')
      .max(20, 'Too Long!')
      .required("merci d'entrer username"),
  phone: Yup.number()
      .positive()
      .required("merci d'entrer le numero de telephone"),
  email: Yup.string()
      .email('email non valid')
      .required("merci d'entrer l'email"),
  password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
  confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
});

const register = () => {

  const router = useRouter();

  const [isPasswordShown,setIsPasswordShown] = useState(false);
  const [isChecked,setIsChecked] = useState(false);
  const [message,setMessage] = useState('');

  const { signIn } = useAuth();

  const handleSubmit = async (values) => {
    console.log(JSON.stringify(values));
    await client_register(values)
    .then((data)=>{
        if (data.status === 400) {
            setMessage(data.data.error)
        }else{
            signIn()  
        }     
    })
    .catch(err => {
        console.log(err);
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <View style={{ flex: 1, marginHorizontal: 22 }}>

        <View style={{ marginVertical: 22 }}>
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginVertical: 12,
                    color: COLORS.black
                }}>
                    Create Account
                </Text>

                <Text style={{
                    fontSize: 16,
                    color: COLORS.black
                }}>Connect with your friend today!</Text>
            </View>

          <ScrollView showsVerticalScrollIndicator = {false}>

            <Formik
                  initialValues={{
                  username: '',
                  phone:'',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  }}
            
              validationSchema={DisplayingErrorMessagesSchema}
                  onSubmit={handleSubmit}
            >
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (

                <>
                
                    <View style={{ marginBottom: 12 }}>

                    {message !== '' &&
                      <Text style={{fontSize:'18px',color:'red',fontFamily:FONT.bold}}>{message}</Text>
                    }
                    <Text style={styles.formLabel}>Username</Text>

                    <View style={styles.formInput}>
                     <TextInput
                            placeholder='Enter your username'
                            placeholderTextColor={COLORS.black}
                            style={styles.formWidthInput}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                    </View>
                    {errors.username && <Text>{errors.username}</Text>}
                  
                </View> 


                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.formLabel}>Email address</Text>

                    <View style={styles.formInput}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={styles.formWidthInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                    </View>
                    {errors.email && <Text>{errors.email}</Text>}
                </View>


                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.formLabel}>Telephone</Text>

                    <View style={styles.formInput}>
                      
                        <TextInput
                            placeholder='Entrer votre telephone'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={styles.formWidthInput}
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                        />
                    </View>
                    {errors.phone && <Text>{errors.phone}</Text>}

                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.formLabel}>Mot de passe</Text>

                    <View style={styles.formInput}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={styles.formWidthInput}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text>{errors.password}</Text>}

                </View>


                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.formLabel}>Confirmer Mot de passe</Text>

                    <View style={styles.formInput}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            style={styles.formWidthInput}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                    {errors.confirmPassword && <Text>{errors.confirmPassword}</Text>}

                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>I aggree to the terms and conditions</Text>
                </View>

                <LoginBtn
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    onPress={handleSubmit}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../../assets/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                    <Pressable
                        onPress={() => router.push('/login')}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>
                
                
                </>

            )}
           

            </Formik>
            </ScrollView>
        </View>
    </SafeAreaView>
)

}













const styles  = StyleSheet.create({
formLabel: {
fontSize: 16,
marginVertical: 8,
fontFamily:FONT.bold,
},

formInput:{
width: "100%",
height: 48,
borderColor: COLORS.primary,
borderWidth: 1.5,
borderRadius: 8,
alignItems: "center",
justifyContent: "center",
paddingLeft: 22
},

formWidthInput:{
  width:'100%'
}
});

export default register