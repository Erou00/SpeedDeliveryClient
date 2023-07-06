import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { COLORS, SIZES, icons } from '../../../constants'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Alert } from 'react-native'
import { Badge } from '@rneui/themed'
import CommandeList from './CommandeList'


const data = [
  { id: 1, num: 1, month: 'Sep' },
  { id: 2, num: 2, month: 'Jan' },
  { id: 3, num: 3, month: 'Aug' },
  { id: 4, num: 4, month: 'Dec' },
  { id: 5, num: 5, month: 'Jul' },
  { id: 6, num: 6, month: 'Oct' },
  { id: 7, num: 7, month: 'Sep' },
  { id: 8, num: 8, month: 'Jan' },
  { id: 9, num: 9, month: 'May' },
]


const Commandes = () => {
  const [commandeList, setcommandeList] = useState(data)

  showAlert = viewId => {
    Alert.alert('alert', 'commande clicked ' + viewId)
  }
  return (
    <View style={styles.container}>
        <View style={styles.commandeList}>

          {data.map((item) => (

             <CommandeList key={item.id} item={item}/>

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