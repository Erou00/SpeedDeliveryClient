import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS, icons } from '../../../constants'
import { Badge } from '@rneui/themed'
import { useRouter } from 'expo-router'

const CommandeList = ({item}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
     onPress={() => router.push(`commandes/detail-commande/${item.id}`)} key={item.id}>
    <View style={styles.commandeBox}>
      <View style={styles.commandeNum}>
        <Text style={styles.commandeNumText}>{item.num}</Text>
      </View>
      <View style={styles.commandeContent}>
        <Text style={styles.commandeDate}>2022/05/07</Text>
        <Badge value='Livrée' status='success'/>

        <View style={{flex:1,flexDirection:'row'}}>
        
        <View style={{flexDirection:'row'}}>
            <Image  source={icons.cubes} style={{width:20,height:15,marginTop:5,marginRight:3, tintColor: COLORS.tertiary}} />
            <Text style={styles.commandeQte}>Qte: 12</Text>
        </View>

        <View style={{flexDirection:'row',marginLeft:10}}>
          <Image  source={icons.price} style={{width:15,height:15,marginTop:5,marginRight:3, tintColor: COLORS.tertiary}} />
          <Text style={styles.commandePrix}>Prix: 15 DH</Text>
        </View>

      </View>
        
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, elit consectetur
        </Text>
      </View>
    </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    container: {
      // marginVertical: SIZES.small,
      // justifyContent: "center",
      // alignItems: "center",
    },
  
    commandeList: {
      marginTop: 20,
    },
    commandeBox: {
      padding: 10,
      marginTop: 5,
      marginBottom: 5,
      flexDirection: 'row',
    },
    commandeNum: {
      flexDirection: 'column',
    },
    commandeNumText: {
      fontSize: 50,
      color: COLORS.primary,
      fontWeight: '600',
    },
  
    commandeContent: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: 10,
      backgroundColor: '#FFFFFF',
      padding: 10,
      borderRadius: 10,
    },
    description: {
      fontSize: 15,
      color: '#646464',
    },
    commandeDate: {
      fontSize: 18,
      color: '#555',
      fontStyle:'italic'
    },
    commandeQte: {
      fontSize: 16,
      color: COLORS.secondary,
    },
  
    commandePrix: {
      fontSize: 16,
      color: COLORS.primary,
      // marginLeft:10
    },
  
  })
  

export default CommandeList