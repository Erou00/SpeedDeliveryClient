import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import styles from './colis.style'
import ColisCard from '../../common/cards/colis/ColisCard'
import { COLORS, SHADOWS, SIZES } from '../../../constants';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';

import { LinearGradient } from 'react-native-svg'
import { useEffect } from 'react';
import { useAuth } from '../../../context/auth';
import { latest_packs } from '../../../app/api/axios_pack';
import { useRouter } from 'expo-router';



const Colis = () => {
  const [selectedColis,setSelectedColis] = useState();
  
  const [packs,setPacks] = useState([])

  const router = useRouter();

  const { userInfo } = useAuth()

  const handleCardPress = (item) => {

    // setSelectedColis(item.id)
    // console.log(selectedColis);
  }

  const fetchPacks = async (id) => {
    await latest_packs(id)
    .then(({data})=>{
        setPacks(data.data)
    }).catch(err => {
        console.log(err);
    })
  }

  useEffect(()=> {
    if (userInfo) {
        fetchPacks(userInfo.id)
    }
  },[userInfo])


  return (
    <>
       <View style={{
                   flexDirection:"row",
                   paddingHorizontal:10,
                   width:"100%",
                   alignItems:"center",
                   marginTop:20
               }}>
                   <View style={{width:"50%"}}>
                        <Text style={{
                            fontWeight:"bold",
                            fontSize:17,
                            color:"#585a61"
                        }}>LES DERNIERS COLIS</Text>
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
                            router.push('colis');
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
            

            <ScrollView 
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={{height:250,marginBottom:10}}
                  >
                      <LinearGradient
                          colors={["rgba(0,164,109,0.09)", "transparent"]}
                          style={{
                              position:"absolute",
                              left:0,
                              right:0,
                              height:100,
                              marginTop:220,
                              top:0
                          }}
                      />
                     
                     {
                        packs.map((p) => (
                          
                            <ColisCard key={p.id} item={p}/>
                        ))
                     }
                    

            </ScrollView>  
    </>
  )
}

export default Colis