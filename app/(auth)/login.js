import { View, Text, Image , Pressable, TextInput, TouchableOpacity, StatusBar, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
// import Button from '../components/Button';
import { COLORS, FONT } from '../../constants';
import LoginBtn from '../../components/buttons/LoginBtn';
import { Redirect, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { user_login } from '../api/user_auth';
import { useAuth } from '../../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const Login = () => {

    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [message,setMessage] = useState('');

    const router = useRouter();

    const { user,signIn } = useAuth();

    const onSubmit = async () => {
        const payload = {
            username: username,
            password: password,
            grantType:'password',
            withRefreshToken:true,
        }

       await user_login(payload)
        .then((data)=> {
            console.log(data);
            if (data.status === 401) {
                setMessage(data.message);
            }else{
            //  console.log(data.data.accessToken);
             signIn(data.data.accessToken);
            }
          
        })
        .catch(err => {
            console.log(err);
        })
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite}}>
            <View style={{ flex: 1,}}>
            <StatusBar
              backgroundColor={COLORS.primary}
              barStyle="light-content"
              hidden={false}
            />
            <View style={styles.uppercard}>
              {/* <Image 
              style={{width:70,height:70,borderRadius:35}}
              source={{uri:'https://yt3.ggpht.com/yti/APfAmoG-m3--E1zYY977bOWG0FS_syFGSbqjyAbh6dDi=s88-c-k-c0x00ffffff-no-rj-mo'}}   
              />*/}
              <Text 
              style={{color:COLORS.primary,
              fontFamily: FONT.Caprasimo,
              fontWeight:'bold',
              fontSize:40,
              marginLeft:-60
              }}>
                SPEED 
              </Text> 
              <Text style={{color:COLORS.tertiary,fontFamily: FONT.Caprasimo,
              fontWeight:'bold',
              fontSize:40,marginLeft:60}}>DELIVERY</Text>
            </View>
               <ScrollView showsVerticalScrollIndicator={false}>
            
        

                <View style={{ marginVertical: 8, marginHorizontal: 22  }}>
                    {message !== '' &&
                      <Text 
                      style={styles.errMsg}>{message}</Text>
                    }


                    <View style={styles.inputContainer}>
                    <View style={styles.inputIconView}>
                    <FontAwesome name="user-circle-o"
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          textAlign: 'center',
                        }}
                      />
                    </View>
                    <TextInput
                      style={styles.inputs}
                      placeholder="Username"
                      keyboardType="default"
                      underlineColorAndroid="transparent"
                      onChangeText={value => {
                        setUsername(value);
                      }}
                      value={username}
                      placeholderTextColor={COLORS.liteBlack}
                    />
                    </View>   
                
                    <View style={styles.inputContainer}>
                    <View style={styles.inputIconView}>
                    <MaterialIcons name="lock"
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          textAlign: 'center',
                        }}
                      />
                    </View>
                    <TextInput
                      style={styles.inputs}
                    
                      underlineColorAndroid="transparent"
                      onChangeText={value => {
                        setPassword(value);
                      }}
                      value={password}
                      placeholder='Mot de passe'
                      placeholderTextColor={COLORS.black}
                      secureTextEntry={isPasswordShown}
                      
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
                                    <Ionicons name="eye-off" size={24} color={COLORS.primary} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.primary} />
                                )
                            }

                        </TouchableOpacity>
                    </View> 


                    <TouchableOpacity
                    style={styles.btn}
                    onPress={onSubmit}
                    >
                    <Text style={styles.btnText}>Se Connecter</Text>
                    </TouchableOpacity>
                 
                </View>

                


                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, marginHorizontal: 22  }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.secondary,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14,fontFamily:FONT.bold }}>Or Login with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.secondary,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginHorizontal: 22 
                }}>
                   

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 50,
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
                    marginVertical: 10
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
                    <Pressable
                        onPress={() => router.push('/register')}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable>
                </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
  uppercard: {
    height: height / 3,
    backgroundColor : COLORS.theme,
    borderBottomLeftRadius: height / 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputs: {
    borderBottomColor: COLORS.white,
    flex: 1,
    color: COLORS.liteBlack,
    paddingLeft: 10,
    fontFamily : FONT.bold,
  },
  inputContainer: {
    borderRadius: 30,
    height:48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginBottom:10,
    elevation: 2,
  },
  inputIconView: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : COLORS.primary,
    height: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 2,
  },
  errMsg:{

        fontSize:18,
        color:'red',
        fontFamily:FONT.bold,
        textAlign:'center',
        marginVertical:6

  },
    btnText: {
    color: '#fff',
    fontFamily : FONT.bold,
    fontSize: 14,
    marginTop: 2,
    },
  btn: {
    backgroundColor : COLORS.primary,
    width: '100%',
    height: 50,
    borderRadius: 30,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
export default Login