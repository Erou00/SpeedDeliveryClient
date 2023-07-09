import { View, Text, SafeAreaView, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter,useSearchParams } from 'expo-router'
import { COLORS, SIZES, icons } from '../../../constants'
import ScreenHeaderBtn from '../../../components/common/header/ScreenHeaderBtn'
import { ScrollView } from 'react-native'
import Top from '../../../components/colisDetails/top/Top'
import Tabs from '../../../components/colisDetails/tabs/Tabs'
import Info from '../../../components/colisDetails/info/Info'
import Commandes from '../../../components/colisDetails/commandes/Commandes'
import { useEffect } from 'react'
import { get_pack_by_id } from '../../api/axios_pack'
import { Ionicons } from '@expo/vector-icons'



const tabs = ["Info", "Commandes"];
const ColisDetails = () => {
    const {id} = useLocalSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const [refreshing, setRefreshing] = useState(false);

    const [pack,setPack] = useState({})



      const getPack  = async () =>{
        await get_pack_by_id(id).then(({data}) => {
           
            setPack({
                id:data.data.id,
                image:data.data.image,
                name:data.data.name,
                designation: data.data.designation,
                quantite: data.data.quantite,
                prixUnitaire: data.data.prixUnitaire,
                prixTotal:data.data.prixTotal,
                categorie:data.data.categorie.name, 
              
            })

            console.log(pack);
          }).catch(err => {
            console.log(err);
          })
      }
      
      const onRefresh = useCallback(()=>{
       setRefreshing(true);
       setRefreshing(false);
         
    
      },[]);

      useEffect(()=>{
        
        getPack()
      },[])

      const displayTabContent = () => {
        switch (activeTab) {
            case "Info":
                return <Info designation={pack.designation}
                 prixTotal={pack.prixTotal} quantite={pack.quantite} prixUnitaire={pack.prixUnitaire}/>
    
    
            case "Commandes":
                return  ( 
                  <>
                  {(pack) ? 
                     <Commandes packId={pack.id}  />
                  :
                  <Text>No Commandes</Text>
                  }
                  
                  </>
                )
    
 
            default:
                break;
        }
      }
     
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>
    <Stack.Screen
        options={{
            headerShown:true,
            headerStyle:{backgroundColor:COLORS.lightWhite},
            headerShadowVisible:false,
            headerBackVisible:false,
            headerLeft: () => (
                <ScreenHeaderBtn 
                    iconUrl={icons.left}
                    dimension="60%"
                    handlePress={() => router.back()}
                />
            ),
    
            headerTitle:''
        }} 
        
    />

<ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >

                    <View style={{paddingHorizontal : SIZES.xSmall,paddingBottom:100}}>
                    <TouchableOpacity
          onPress={() => router.back()}
           style={
                      { top: 30,
                        left: 10, position: "absolute",zIndex:1000 }}>
             <Ionicons
                    
                    name="arrow-back-circle"
                    size={30}
                    color="#fff"
                    
          />
          </TouchableOpacity>
                           <Top
                                 colisImage={pack.image}
                                 packname={pack.name}
                                categorie={pack.categorie}
                             
                           />
                           
                            <Tabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />

                            {displayTabContent()}
                        </View>


            </ScrollView>
    
    </SafeAreaView>
  )
}

export default ColisDetails