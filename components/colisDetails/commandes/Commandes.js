import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { COLORS, SIZES, icons } from '../../../constants'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Alert } from 'react-native'
import { Badge } from '@rneui/themed'
import CommandeList from './CommandeList'
import { get_commande_by_pack_id } from '../../../app/api/axios_command'
import { useEffect } from 'react'



const Commandes = ({packId}) => {
  const [commandesList, setCommandesList] = useState([])

  showAlert = viewId => {
    Alert.alert('alert', 'commande clicked ' + viewId)
  }

  const getStatus = async() =>{
    await get_commande_by_pack_id(packId).then(({data})=>{
     console.log(data);
     setCommandesList(data.data) 
    })
 }

 useEffect(()=>{
   getStatus()
 },[])
  return (
    <View style={styles.container}>
        <View style={styles.commandeList}>

          {commandesList.map((item,index) => (

             <CommandeList key={item.id} item={item} index={index} />

          ))

          }

        </View>
    </View>
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

})

export default Commandes