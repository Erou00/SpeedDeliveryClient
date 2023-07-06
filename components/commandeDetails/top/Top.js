import { View, Text,StyleSheet, Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONT, SIZES, icons } from '../../../constants'
import { Image } from 'react-native'
import { FontAwesome,Icon } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import ShowImage from '../../image/ShowImage'



const Top = ({ id,colisImage,name,categorie}) => {
  const router = useRouter();
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.detail} onPress={()=>{router.push(`colis/detail-colis/${id}`)}}>
        <View style={styles.imageBox}>
             {colisImage && <ShowImage imageName={colisImage} imageStyle={styles.imageImage} />}
          </View>
          <View style={styles.coliInfo}>
              <Text style={styles.detailText}>COLIS: {name}</Text> 

              <View style={styles.categorieBox}>
                
                <Image 
                source={icons.categorie}
                resizeMode='contain'
                style={styles.categorieImage}
                />
                <Text style={styles.categorieName}>{categorie}</Text>
            </View>
                        
          </View>
      </TouchableOpacity>
        

    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      marginVertical: SIZES.small,
      // justifyContent: "center",
      // alignItems: "center",
    },
    imageBox: {
      width: 80,
      height: 80,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFF",
      // borderRadius: SIZES.large,
    },
    imageImage: {
      width: "100%",
      height: "100%",
      // borderRadius: SIZES.large,

    },
   

    detail:{
      flexDirection:"row",
      justifyContent:"flex-start", 
      // alignItems:"center",
      paddingHorizontal:2,
      marginTop:3,
      
    },
    coliInfo:{
      marginLeft:10,
    },
    detailText:{
      flex:0,
      fontFamily:FONT.bold,
      textTransform:'uppercase',
      fontSize:18,
     
    },
    icon1: {
      color: "rgba(128,128,128,1)",
      fontSize: 18,
      fontWeight:'bold',
      height: 23,
      width: 20,
      marginRight:8,
    },
    categorieBox: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
     
    },
    categorieImage: {
      width: 30,
      height: 30,
      tintColor: COLORS.gray,
    },
    categorieName: {
      fontSize: SIZES.medium - 2,
      color: COLORS.gray,

      marginLeft: 2,
    },
  });
export default Top