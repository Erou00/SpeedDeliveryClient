

import CommandeCard from '../../common/cards/commande/CommandeCard'
import { COLORS } from '../../../constants'
import { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import { useEffect } from 'react'
import { latest_commandes } from '../../../app/api/axios_command'
import { useAuth } from '../../../context/auth'
import { useRouter } from 'expo-router'
 
const Commandes = () => { 
 

  const [commandes, setCommandes] = useState([])
 
  const { userInfo } = useAuth()

  const router = useRouter();


  // const clickEventListener = item => {
  //   Alert.alert('Item selected: ' + item.description)
  // }

  // const __getCompletedIcon = item => {
  //   if (item.completed == 1) {
  //     return 'https://img.icons8.com/flat_round/64/000000/checkmark.png'
  //   } else {
  //     return 'https://img.icons8.com/color/70/000000/delete.png'
  //   }
  // }

  // const __getDescriptionStyle = item => {
  //   if (item.completed == 1) {
  //     return { fontStyle: 'italic', color: '#808080' }
  //   }
  // }

  const fetchCommandes = async (id) => {
    await latest_commandes(id)
    .then(({data})=>{
        console.log(data);
        setCommandes(data.data)
    }).catch(err => {
        console.log(err);
    })
  }

  useEffect(()=>{

    if (userInfo) {
        fetchCommandes(userInfo.id)
    }

  },[userInfo])

  return (
  
     

      <View style={styles.container}>
        
      
     <View style={{
                   flexDirection:"row",
                   paddingHorizontal:10,
                   width:"100%",
                   alignItems:"center",
                   marginBottom:20
               }}>
                   <View style={{width:"50%"}}>
                        <Text style={{
                            fontWeight:"bold",
                            fontSize:17,
                            color:"#585a61"
                        }}>LES COMMANDES</Text>
                        <View style={{
                            height:4,
                            backgroundColor:"#b1e5d3",
                            width:115,
                            // marginTop:-5
                        }}>

                        </View>

                   </View>
                   <View style={{width:"50%", alignItems:"flex-end"}}>
                        <TouchableOpacity 
                          onPress={()=>{
                            router.push('commandes')
                          }}
                        style={{
                            backgroundColor:COLORS.primary,
                            paddingHorizontal:20,
                            paddingVertical:5,
                            borderRadius:15
                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                fontSize:13,
                                color:"#FFF"
                            }}>Plus</Text>
                        </TouchableOpacity>
                   </View>
               </View>
   
             <View style={styles.tasks}>

              {commandes.map((item)=> (
                  <CommandeCard key={item.id} item={item}/>
              ))}
             </View>
           
         
    </View>

  
  )
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: 20,
    // backgroundColor: '#eeeeee',
  },
  tasks: {
    // flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  
  },
  image: {
    width: 25,
    height: 25,
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 10,
    marginHorizontal: 2,
    backgroundColor: 'white',
    borderLeftWidth: 6,
    padding: 10,

    // flexBasis: '46%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  description: {
    fontSize: 18,
    color: '#008080',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    flex: 1,
    color: '#696969',
    marginTop: 5,
  },
})


export default Commandes