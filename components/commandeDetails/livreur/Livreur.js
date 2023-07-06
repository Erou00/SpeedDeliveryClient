import { View, Text, StyleSheet,Image,Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONT, icons } from '../../../constants'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import PhoneBtn from '../../buttons/PhoneBtn'
 
const Livreur = ({livreur}) => {

 
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image style={styles.avatar} source={{uri:'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>
            <View style={styles.informationContainer}>
                <Text style={styles.name}>{livreur.firstname.toUpperCase()} {livreur.lastname.toUpperCase()}</Text>
                <View style={styles.detail} >
                    <FontAwesome name="phone-square" style={styles.icon1}/>
                    <View>
                        <Text style={styles.detailText}>{livreur.phone}</Text>
                    </View>
                </View>

                <View style={styles.detail}>
                    <MaterialCommunityIcons name="email" style={styles.icon1}/>
                    <View>
                        <Text style={styles.detailText}>{livreur.email}</Text>
                    </View>
                </View>

                

              
                <View style={styles.detail}>

                  <PhoneBtn btnWidth={5} btnHeight={5}  btnImage={icons.phone} num={'0643069283'} />
                
                </View>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFF',
    },
    header:{
        backgroundColor:COLORS.lightWhite,
        // height:250,
        flexDirection:'row',
        justifyContent:'center',
        // alignItems:'center',
        // paddingTop: 10,
        paddingVertical:16,
        marginTop:20,
      },
      avatar:{
        width:Dimensions.get('window').width/3,
        height:150,
        borderRadius:4,
      },
      informationContainer:{
        width:Dimensions.get('window').width/2.5,
        marginLeft:20,
        
      },
      name:{
        fontSize:22,
        fontFamily:FONT.bold,
        fontWeight:'bold',
        color:COLORS.primary
      },
      label:{
        fontSize:14,
        color:'#000',
        // marginTop:10,
        fontWeight:'500',
        lineHeight:20
      },

      detail:{
        flexDirection:"row",
        justifyContent:"flex-start", 
        // alignItems:"center",
        // paddingHorizontal:14,
        // marginTop:3
      },
      detailText:{
        flex:0,
        fontFamily:FONT.chelseaMarket,
      },
      icon1: {
        color: "rgba(128,128,128,1)",
        fontSize: 20,
        fontWeight:'bold',
        // height: 23,
        // width: 23,
        marginRight:8,
      },
})

export default Livreur