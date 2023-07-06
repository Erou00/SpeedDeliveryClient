import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONT, SHADOWS, SIZES, icons } from '../../../constants'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import CustomCard from '../../common/cards/custom/CustomCard'
import StackComponent from '../../stack/StackComponent'
import Status from '../../status/Status'
import Colis from '../colis/Colis'
import Commandes from '../commandes/Commandes'

import { useRouter } from 'expo-router'
import { useAuth } from '../../../context/auth'


const Welcome = ({searchTerm,setSearchTerm,handleClick}) => {
    
  const router = useRouter();

  const {userDetails,username,userInfo} = useAuth();
 
  const tabHandler = (item)=>{
    router.push(`/search/${item}`)
  }



    const welcomeText = () => {

      const hours = new Date().getHours()
      const isDayTime = hours > 6 && hours < 19;
      if(isDayTime === true){
       return "Bonjour"
      } else {
         return "Bonsoir"
      
      }

    }


    useEffect(()=>{},[])






    return (
      <View style={styles.container}>
        <StackComponent/>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

          <View style={styles.topview}>
             <View style={styles.welcomecontainer}>
                  <Text style={styles.welcomemessage}>{welcomeText()+","}</Text>
                  <Text style={styles.usernametext}>{username}</Text>
              </View>




              <View style={styles.searchContainer}>
                    <View style={styles.searchWrapper}>  
                        <TextInput
                          style = {styles.searchInput}
                          value={searchTerm}
                          onChangeText={(text) =>  console.log(text)}
                          placeholder='what are you lookink for?'
                        />
                    </View>

              <TouchableOpacity style={styles.searchBtn} 
                onPress={handleClick}>
                  <Image 
                    source={icons.search}
                    resizeMode='contain'
                    style={styles.searchBtnImage}
                  />
                </TouchableOpacity>
                </View>

                <View>
                  <Status  tabHandler={tabHandler} />
                </View>
          </View>
          <View style={styles.bottomview}>


          <CustomCard elevated={true} style={{backgroundColor:"#fff",marginHorizontal:24,marginTop:-20,padding:30,borderRadius:10,flexDirection:"row",justifyContent:"space-between"}}>
                    <View style={{alignItems:"center"}}>
                      <Text style={{fontFamily:FONT.bold, marginBottom:10}}>Colis</Text>
                      <Text style={{fontFamily:FONT.chelseaMarket,fontSize:18}}>{userDetails.packCount}</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                      <Text style={{fontFamily:FONT.bold, marginBottom:10}}>Commandes</Text>
                      <Text style={{fontFamily:FONT.chelseaMarket,fontSize:18}}>{userDetails.commandeCount}</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                      <Text style={{fontFamily:FONT.bold, marginBottom:10}}>Montant</Text>
                      <Text style={{fontFamily:FONT.chelseaMarket, fontSize:18}}>MAD { userInfo?.amount } </Text> 
                    </View>
          </CustomCard> 

         
          
          
          <View style={styles.detailsview}>

             <Colis/>          

                

             <Commandes/>



          


          </View>

            



           
          
      </View>
      </ScrollView>
    </View>
  )
} 


const styles = StyleSheet.create({
  topview:{
     marginTop:10,
     marginBottom:60,
      marginHorizontal:10, 
    // backgroundColor:COLORS.primary,
    // flex:1,
    // justifyContent:"space-between"
  },
  welcomemessage:{
    color:"#fff",
    fontSize:35,
    fontWeight:"bold"
  },

  usernametext : {
    color:"#fff",
    fontSize:35,
    fontFamily :FONT.bold,
    marginBottom:5
  },

  welcomecontainer:{
    // flexDirection:"row",
    // justifyContent:"space-between",
    alignItems:"flex-start",
    marginBottom:5,
  },


  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // marginTop: SIZES.large, 
    height: 50,
    // marginBottom:SIZES.xLarge
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },

  bottomview:{
    flex:2,
    backgroundColor:"#fff",
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
  },
  detailsview:{
    paddingHorizontal:10
  },
  container: {
    flex:1,
    backgroundColor:COLORS.primary,
  },
});

export default Welcome