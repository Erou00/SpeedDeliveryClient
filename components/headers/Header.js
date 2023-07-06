import { View, Text } from 'react-native'
import React from 'react'
import { ImageBackground } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { images } from '../../constants'
import { Dimensions } from 'react-native'
import { useRouter } from 'expo-router'

const Header = ({bg,headerWidth,title,subTitle,textSize}) => {
  const router = useRouter();
  return (
    <ImageBackground  source={bg}
    style={{height: Dimensions.get('window').height / headerWidth}} resizeMode='stretch'
    >
      <Ionicons
        onPress={() => router.back()}
        name="arrow-back-circle"
        size={30}
        color="#fff"
        style={
          { top: 30,
             left: 10, position: "absolute",zIndex:1000 }}
      />
      <View style={styles.brandView}>         
      <Text style={styles.brandViewText(textSize)}>{title}</Text>
       <Text
            style={{color:'white',fontStyle:'italic',fontSize:18 ,fontWeight:'bold'}}>{subTitle}
            </Text>
      </View>
        
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    brandView : {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
  
    },
    brandViewText:(textSize)=>({
      color:'#fff',
      fontSize:textSize,
      fontWeight:'bold',
      textTransform : 'uppercase',
      fontStyle:'italic',
    
    }),
})
export default Header