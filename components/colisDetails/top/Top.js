import { View, Text,StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { COLORS, FONT, SIZES, icons } from '../../../constants'
import { Image } from 'react-native'
import ShowImage from '../../image/ShowImage'


const Top = ({packname,categorie,colisImage}) => {

  const imageName = colisImage;
  return (
     <View style={styles.container}>

    <View style={styles.imageBox}>
            
       {imageName && <ShowImage imageName={imageName} imageStyle={styles.imageImage} />}
      
    </View>

    <View style={styles.colisTitleBox}>
         <Text style={styles.colisTitle}>{packname}</Text>
    </View>

    <View style={styles.colisInfoBox}>
        <View style={styles.categorieBox}>
          <Image 
          source={icons.categorie} 
          resizeMode='contain'
          style={styles.categorieImage}
          />
          <Text style={styles.categorieName}>{categorie}</Text>
        </View>
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      marginTop:25,
      marginBottom: SIZES.small,
      justifyContent: "center",
      alignItems: "center",
    },
    imageBox: {
      width: Dimensions.get('window').width ,
      height: 200,
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
    colisTitleBox: {
      marginTop: SIZES.small,
    },
    colisTitle: {
      fontSize: SIZES.xLarge,
      color: COLORS.primary,
      fontFamily: FONT.bold,
      textAlign: "center",
    },
    colisInfoBox: {
      marginTop: SIZES.small / 2,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    colisName: {
      fontSize: SIZES.medium - 2,
      color: COLORS.primary,
    //   fontFamily: FONT.medium,
    },
    categorieBox: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    categorieImage: {
      width: 14,
      height: 14,
      tintColor: COLORS.gray,
    },
    categorieName: {
      fontSize: SIZES.medium - 2,
      color: COLORS.gray,

      marginLeft: 2,
    },
  });
export default Top