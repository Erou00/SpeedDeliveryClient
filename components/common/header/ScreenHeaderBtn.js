import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './screenheader.style'



export default function ScreenHeaderBtn({iconUrl,dimension,handlePress}) {
  
  return (
    <TouchableOpacity 
    style= {styles.btnContainer}
    onPress={handlePress} >
      <Image 
        source={iconUrl}
        resizeMode='cover'
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  )
}