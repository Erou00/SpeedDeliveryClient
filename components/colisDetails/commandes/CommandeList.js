import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { COLORS, icons } from '../../../constants'
import { Badge } from '@rneui/themed'
import { useRouter } from 'expo-router'

const CommandeList = ({item,index}) => {
  const router = useRouter();

  const __getCompletedIcon = item => {

    if (item.statut.statut == "NOUVELLE" || item.statut.statut == "EN COURS") {
     return  <Badge value={'En cours'} status="warning" 
       textStyle={{fontSize:16,padding:2,fontWeight:'bold'}}
       containerStyle={{alignContent:'flex-start',marginRight:'auto'}}
       badgeStyle={{width:80,height:30}}
     />
   } else if (item.statut.statut == "EN TRAIN DE LIVREE" ) {
     
     return <Badge value={item.statut.statut} status="primary" 
         textStyle={{fontSize:16,padding:2,fontWeight:'bold'}}
         containerStyle={{alignContent:'flex-end',marginRight:'auto'}}
         badgeStyle={{width:200,height:30}}
     />
   } else if (item.statut.statut == "LIVREE" ) {
     
     return <Badge value={item.statut.statut} status="success" 
         textStyle={{fontSize:16,padding:2,fontWeight:'bold'}}
         containerStyle={{alignContent:'flex-end',marginRight:'auto'}}
         badgeStyle={{width:80,height:30}}
     />
   } else if (item.statut.statut == "RETOUR" ) {

     return <Badge value={item.statut.statut} status="error"
      textStyle={{fontSize:16,padding:2,fontWeight:'bold'}}
      containerStyle={{alignContent:'flex-end',marginRight:'auto'}}
      badgeStyle={{width:80,height:30}}
      />
   }

 }


  return (
    <TouchableOpacity
     onPress={() => router.push(`commandes/detail-commande/${item.id}`)} key={item.id}>
    <View style={styles.commandeBox}>
      <View style={styles.commandeNum}>
        <Text style={styles.commandeNumText}>{index+1}</Text>
      </View>
      <View style={styles.commandeContent}>
        <Text style={styles.commandeDate}>{item.creationDate}</Text>
        {__getCompletedIcon(item)}

        <View style={{flex:1,flexDirection:'row'}}>
        
        <View style={{flexDirection:'row'}}>
            <Image  source={icons.cubes} style={{width:20,height:15,marginTop:5,marginRight:3, tintColor: COLORS.tertiary}} />
            <Text style={styles.commandeQte}>Qte: {item.quantite}</Text>
        </View>

        <View style={{flexDirection:'row',marginLeft:10}}>
          <Image  source={icons.price} style={{width:15,height:15,marginTop:5,marginRight:3, tintColor: COLORS.tertiary}} />
          <Text style={styles.commandePrix}>Prix: {item.price} DH</Text>
        </View>

      </View>
        
        <Text style={styles.description}>
          {item.address}
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