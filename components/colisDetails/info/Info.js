import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONT, SIZES } from '../../../constants';



const Info = ({designation,prixTotal,quantite,prixUnitaire}) => {
  return (
    <View style={styles.container}>
  
    <View style={styles.contentBox}>
   
      <Text style={styles.headText}>Détail : </Text>
      <View style={styles.body}>
        <Text style={styles.bodyText}>
           {designation}
        </Text>
      </View>
 

      <View style={styles.bottom}>
        <Text style={styles.bottomText}>Date D'enter: 2023/05/07</Text>
        <Text style={styles.bottomText}>Prix unitaire: {prixUnitaire} Dh</Text>
        <Text style={styles.bottomText}>Quantié : {quantite}</Text>
        <Text style={styles.bottomText}>Montant : {prixTotal} DH</Text>

      </View>


    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.large,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
  },
  headText: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  contentBox: {
    marginVertical: SIZES.small,
  },
  contextText: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONT.regular,
    // marginVertical: SIZES.small / 1.25,
  },

  bottom: {

    // alignItems:'flex-end',
    textAlign:'left',
    marginBottom:20,
    marginTop:20,
  },
  bottomText: {
    textAlign:'justify',
    fontFamily:FONT.bold,
    fontSize: 14,
    // fontWeight: 'bold',
    color: '#000',
    padding:5,
  },
  subject: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
    marginBottom: 2,
    color: '#222'
  },
  body: {
    marginTop: 2,
    paddingTop:10,
    borderTopWidth:0.5,
    borderTopColor:'#b3b3b3',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  attachments: {
    marginTop: 20,
  },
  
});

export default Info