import { View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import ScreenHeaderBtn from '../../../components/common/header/ScreenHeaderBtn'
import { COLORS, SIZES, icons, images } from '../../../constants'
import Top from '../../../components/commandeDetails/top/Top'
import Tabs from '../../../components/commandeDetails/tabs/Tabs'
import Info from '../../../components/commandeDetails/info/Info'
import EnregistrerBtn from '../../../components/buttons/EnregistrerBtn'
import Header from '../../../components/headers/Header';
import Container from '../../../components/container/Container';
import Livreur from '../../../components/commandeDetails/livreur/Livreur'
import { useEffect } from 'react'
import { get_commande_by_id } from '../../api/axios_command'
import CommandeMap from '../../../components/commandeDetails/commandeMap/CommandeMap'
import Pusher from 'pusher-js/react-native';
import { ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Popup, SPSheet } from 'react-native-popup-confirm-toast'
import { CreateIconSetFromIcoMoon, Ionicons } from '@expo/vector-icons'
import { Toast } from 'react-native-toast-message'
import { StatusBar } from 'react-native'
import { popupSuccessMessage, withProgressBar } from '../../../utils/Utils'
import { useAuth } from '../../../context/auth'



const tabs = ["Livreur","Map"];

const CommandeDetails = () => {


  const params = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [commande , setCommande] = useState({})
  const [statut ,setStatut] = useState('')
  const [refreshing, setRefreshing] = useState(false);

  const [orderLocation,setOrderLocation] = useState({
    longitude: '',
    latitude:'',
  });

  const {  _get_userinfo ,userInfo} = useAuth();

  const onRefresh = useCallback(()=>{
    setRefreshing(true);
 
     setRefreshing(false);
         
     
  },[]);

  const getCommande = async()=>{
    get_commande_by_id(params.id)
    .then(({data}) => {
      setCommande(data.data)
      console.log(data.data.statut.statut);
      setStatut(data.data.statut.statut)
      setOrderLocation({
        latitude : data.data.latitude,
        longitude:data.data.longitude,
      })
      // if (condition) {
        
      // }
    }).catch(err => {
      console.log(err);
    })
  }
 

  useEffect(()=>{
    getCommande()
  },[])

 


  
  useEffect(()=>{
    const pusher = new Pusher('ad7757b9128362fb10c9', {
      cluster: 'eu',
      forceTLS: true,
    });
   
    const channel = pusher.subscribe('order-channel');
    channel.bind(`order-track-${params.id}`, (data) => {
      getCommande()
      if (data.order.statut === "LIVREE") {
        withProgressBar(data.order.price,"LIVREE")
        _get_userinfo(userInfo.username)
      }
    });

  

  },[])

  const displayTabContent = () => {
    switch (activeTab) {
        case "Map":
            return (
             
              <>
              {(orderLocation.latitude !== null && orderLocation.longitude !== null) ? 
               <CommandeMap livId={(commande.livreur) ? commande.livreur.id : '' } orderLocation={orderLocation}  statut={statut}/>
              :
                <Text>No coordination</Text>
              }
              </>
            )
             


        case "Livreur":
            return  (
              <>
              {(commande.livreur) ? 
                <Livreur livreur = {commande.livreur}/>
                :
                <Text>No Livreur</Text>
              }
              </>
            )


        default:
            break;
    }
  }

  if ( !commande ) {
    return (
      <>
        <Stack.Screen
        options={{ headerShown: false }} 
        />
        <View style={{alignContent:'center',alignItems:'center'}}>
          <ActivityIndicator size={"large"} color="gray" />
        </View>
      </>
    );
  }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>
      <Stack.Screen
        options={{ headerShown: false }} 
      />

      <ScrollView showsVerticalScrollIndicator={false} style={{marginVertical:25}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>




            <View >
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
                        <Header bg={images.menuBg}  headerWidth={5.5}
                          title={'Commande Détail'} textSize={20}/>
                        <Container pad={-50} padHor={12}  >
                          <Info item={commande}/>
                          <Tabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            /> 
                          {displayTabContent()}
                        </Container> 
                           
                            

                            
                        </View>

                     
      </ScrollView>


      {/* <EnregistrerBtn btnText={'MODIFIER'} btnIcon={icons.add}/> */}

     
    </SafeAreaView>
  )
}



export default CommandeDetails