import React from 'react'
import { StyleSheet } from 'react-native'
import ShowImage from '../../../image/ShowImage'
import { COLORS, FONT } from '../../../../constants'
import { View } from 'react-native'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { Popup, SPSheet } from 'react-native-popup-confirm-toast'
import { popupWithConfirmation } from '../../../../utils/Utils'
import { useRouter } from 'expo-router'

const ColisDefaultCard = ({item,handleCardPress,deletePack}) => {

    const router = useRouter();

    const deleteFunc = () => {
       deletePack(item.id)
    }
  return (
    <TouchableOpacity style={styles.card} onPress={()=>handleCardPress(item)}>
        <ShowImage imageName={item.image} imageStyle={styles.cardImage}/>

        <View style={styles.cardHeader}>
            <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>{item.prixTotal} MAD</Text>
            </View>
        </View>

        <View style={styles.desc}>
            <Text style={styles.textDesc} 
            numberOfLines={3}>{item.designation}</Text>
        </View>

        <View style={styles.cardFooter}>
            <View style={styles.socialBarContainer}>
            <View style={styles.socialBarSection}>
                <TouchableOpacity onPress={()=> router.push({ pathname: 'colis/ajouter-colis',params : {id : item.id}})}
                style={styles.socialBarButton}
                >
                <FontAwesome name="edit" size={24} color={COLORS.primary} />
                
                </TouchableOpacity>
            </View>
            <View style={styles.socialBarSection}>
                <TouchableOpacity style={styles.socialBarButton} onPress={() => {

                           popupWithConfirmation(deleteFunc)

                }
            
            }
            >
                    <Entypo name="trash" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            </View>
        </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: 'white',
    flexBasis: '48%',
    marginHorizontal: 5,
    borderRadius: 10,

  },
  cardHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  
  desc: {
   
    paddingTop: 2,
    paddingBottom: 2,
    paddingHorizontal: 10,
  },

  textDesc:{
    fontFamily:FONT.medium,
    fontSize:13
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 2.5,
    paddingBottom: 4,
    paddingHorizontal: 8,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
     fontSize: 18,
    flex: 1,
    fontFamily:FONT.bold

  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
    fontFamily:FONT.chelseaMarket
  },
  buyNow: {
    color: 'purple',
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarSection: {
    justifyContent: 'flex-end',
    // flexDirection: 'row',
    // flex: 1,
    marginHorizontal : 4
  },
  // socialBarlabel: {
  //   marginLeft: 8,
  //   alignSelf: 'flex-end',
  //   justifyContent: 'center',
  // },
  // socialBarButton: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },


})

export default ColisDefaultCard