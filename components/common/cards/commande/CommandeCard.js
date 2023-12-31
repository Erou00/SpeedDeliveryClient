import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './commande.style'
import { Badge } from '@rneui/themed'
import { COLORS, icons } from '../../../../constants'
import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const CommandeCard = ({item}) => {


  const router = useRouter();
  
  const __getCompletedIcon = item => {
    if (item.statut.statut == "NOUVELLE" || item.statut.statut == "EN COURS" ) {
      return  <MaterialCommunityIcons name="progress-clock" size={30} color={COLORS.gray} />
    } else if (item.statut.statut == "LIVREE" ) {
      return <AntDesign name="checkcircle" size={30} color="green" />
    } else if (item.statut.statut == "RETOUR" ) {
      return <MaterialIcons name="cancel" size={30} color="red" />
    }

  }

  const __getDescriptionStyle = item => {
    if (item.statut.statut == "EN COURS") {
      return { fontStyle: 'italic', color: '#808080' }
    }
  }

  const __getBorderStyle = statut => {
    if (statut == "EN COURS") {
      return { borderColor: COLORS.gray2 }
    }

    if (statut == "LIVREE") {
      return { borderColor: 'green' } 
    }

    if (statut == "RETOUR") {
      return { borderColor: 'red' }
    }
  }

  return (

        <TouchableOpacity style={[styles.container,__getBorderStyle(item.statut.statut)]} 
        onPress={() => { router.push(`commandes/detail-commande/${item.id}`)}}
        >
            <TouchableOpacity >
       
             { __getCompletedIcon(item)}
            </TouchableOpacity>
            <View style={styles.content}>
              <Text style={[styles.description, __getDescriptionStyle(item)]}>
                 {item.pack.name} 
              </Text>
              <View style={styles.contentHeader}>
                <Entypo name="location" size={24} color="black" style={{marginRight:10}} />
                <View>
                <Text style={styles.name} numberOfLines={3}>{item.address}</Text>
                </View>
                
              </View>
            </View>
        </TouchableOpacity>
      
  )
}

export default CommandeCard