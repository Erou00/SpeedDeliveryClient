import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, SHADOWS, icons } from '../../../../constants'
import ShowImage from '../../../image/ShowImage'
import { useRouter } from 'expo-router'




const ColisCard = ({item,selectedColis,handleCardPress,index}) => {

  const router = useRouter();
  return (
    <TouchableOpacity 
    onPress={()=> router.push(`colis/detail-colis/${item.id}`)}
    style={styles.container}
>
            <ShowImage imageName={item.image} imageStyle={styles.image}  />
              <View style={styles.content}>
                  <Text style={{
                      fontWeight:"bold"
                  }}>{item.name}</Text>
                  <Text style={{
                      fontWeight:"bold",
                      color:"#00a46c",
                      paddingLeft:5
                  }}>QTE {item.quantite}</Text>
              </View>
              <Text style={{
                  paddingHorizontal:10,
                  fontWeight:"bold",     
                  color:COLORS.gray,  
                  paddingTop:3
              }}>
                  {item.categorie.name}
              </Text>
          </TouchableOpacity>

  )
}
  


const styles = StyleSheet.create({

  container:{
      height:200,
      backgroundColor:"#FFF",
      marginLeft:20,
      marginTop:20,
      borderRadius:15,
      marginBottom:10,
      width:200,
      ...SHADOWS.medium,
      shadowColor: COLORS.white,
  },
  image:{
    height:120,
    width:200,
    borderTopRightRadius:15,
    borderTopLeftRadius:15
  },
  
  content:{
    flexDirection:"row",
    justifyContent:'space-between',
    paddingTop:10,
    paddingHorizontal:10
  }

})

 
export default ColisCard