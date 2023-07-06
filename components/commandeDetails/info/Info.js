import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONT, SIZES } from '../../../constants'
import Icon from "react-native-vector-icons/Entypo";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Top from '../top/Top';
import { Badge } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import call from 'react-native-phone-call'



const Info = ({item}) => {

  const makeCall = (num) => {
    const args = {
      number: num, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
      skipCanOpen: true // Skip the canOpenURL check
    }
    
    call(args).catch(console.error)
  }


  const __getCompletedIcon = item => {

    if (item.statut.statut == "NOUVELLE" || item.statut.statut == "EN COURS") {
     return  <Badge value={'En cours'} status="warning" 
       textStyle={{fontSize:16,padding:2,fontWeight:'bold'}}
       containerStyle={{alignContent:'flex-end',marginLeft:'auto'}}
       badgeStyle={{width:80,height:30}}
     />
   } else if (item.statut.statut == "EN TRAIN DE LIVREE" ) {
     
     return <Badge value={item.statut.statut} status="primary" 
         textStyle={{fontSize:16,padding:2,fontWeight:'bold'}}
         containerStyle={{alignContent:'flex-end',marginLeft:'auto'}}
         badgeStyle={{width:200,height:30}}
     />
   } else if (item.statut.statut == "LIVREE" ) {
     
     return <Badge value={item.statut.statut} status="success" 
         textStyle={{fontSize:16,padding:2,fontWeight:'bold'}}
         containerStyle={{alignContent:'flex-end',marginLeft:'auto'}}
         badgeStyle={{width:80,height:30}}
     />
   } else if (item.statut.statut == "RETOUR" ) {

     return <Badge value={item.statut.statut} status="error"
      textStyle={{fontSize:16,padding:2,fontWeight:'bold'}}
      containerStyle={{alignContent:'flex-end',marginLeft:'auto'}}
      badgeStyle={{width:80,height:30}}
      />
   }

  }

  return (
    <View style={styles.container}> 


      <View style={styles.contentBox}>

      <View style={styles.headContainer}>
            <View>
                <Text style={styles.headText}>Détail:</Text>
            </View>
            <View>
            
           { item.statut &&  __getCompletedIcon(item) }
            </View>
      </View>
      
      <View style={styles.body}>
      {item.pack && <Top id={item.pack.id}
                       colisImage={item?.pack.image}  
                        name={item?.pack.name} categorie={item?.pack.categorie.name} />
                      }

        <TouchableOpacity style={styles.detail} onPress={()=>makeCall('0664080792')}>
            <FontAwesome name="phone-square" style={styles.icon1}/>
            <View>
                <Text style={styles.detailText}>{item.phone}</Text>
            </View>
        </TouchableOpacity>

        <View style={styles.detail}>
          <Icon name="location" style={styles.icon1}></Icon>
          <View>
              <Text style={styles.detailText}>
                {item.address}
              </Text>
          </View>
        </View>

        <View style={styles.detail}>
        <FontAwesome name="cubes"style={styles.icon1} />
          <View>
              <Text style={styles.detailText}>
                Quantiée : {item.quantite},
              </Text>
          </View>
        </View>


        <View style={styles.detail}>
          <Ionicons name="pricetags-outline"  style={styles.icon1}/> 
          <View>
              <Text style={styles.detailText}>
                Prix : {item.price}MAD
              </Text>
          </View>
        </View>

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
  contentBox: {
    marginVertical: SIZES.small,
  },
  headText: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
  },
  body: {
    marginTop: 2,
    paddingTop:10,
    borderTopWidth:0.5,
    borderTopColor:'#b3b3b3',
  },

  headContainer:{
    flexDirection:"row",
    justifyContent:"space-between", 
    alignItems:"center",
    paddingHorizontal:14,
    marginTop:3
  },


 detail:{
    flexDirection:"row",
    justifyContent:"flex-start", 
    alignItems:"center",
    paddingHorizontal:14,
    marginTop:3
  },
  detailText:{
    flex:0,
    fontFamily:FONT.chelseaMarket,
  },
  icon1: {
    color: "rgba(128,128,128,1)",
    fontSize: 18,
    fontWeight:'bold',
    height: 23,
    width: 20,
    marginRight:8,
  },
 
})

export default Info