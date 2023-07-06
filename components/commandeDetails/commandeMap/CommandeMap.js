import { View, Text, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView , {Marker} from 'react-native-maps'
import { Entypo, EvilIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../../../constants';
import Pusher from 'pusher-js/react-native';


const CommandeMap = ({livId,orderLocation ,statut}) => {
  const { width, height } = useWindowDimensions();

  const [driverLocation,setDriverLocation] = useState({
    longitude: '',
    latitude:'',
  });

  useEffect(()=>{
    if (statut === 'EN TRAIN DE LIVREE' && livId !== '') {
    const pusher = new Pusher('ad7757b9128362fb10c9', {
      cluster: 'eu',
      forceTLS: true,
    });
   
    const channel = pusher.subscribe('order-channel');
          let driver = livId
        channel.bind(`order-track-driver-${driver}`, (data) => {
      
          setDriverLocation({
            latitude:data.location.latitude,
            longitude:data.location.longitude,
          })

          console.log(driverLocation);
        });
      }
      
    

  },[])


  return (
    <View style={{paddingHorizontal:'5%',marginTop:5}}>
      <Text>{orderLocation.latitude}</Text>
      <MapView  style={{
          width:'95%',
          height:300,
        }} 
        initialRegion={{
            latitude: orderLocation.latitude,
            longitude: orderLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }}
        >
         <Marker title={'Laptop'} description={'Fes , hay saada massira 5 app 87 n 586,'} 
          coordinate={{latitude:orderLocation.latitude,longitude:orderLocation.longitude}}>
          <View style={{padding:5,borderRadius:20}}>
            <Entypo name="location-pin" size={30} color={COLORS.tertiary}/>
          </View>
        </Marker>

        { driverLocation.latitude && driverLocation.longitude  &&
            <Marker title={'Laptop'} description={'Fes , hay saada massira 5 app 87 n 586,'} 
            coordinate={{latitude:driverLocation.latitude,longitude:driverLocation.longitude}}>
            <View style={{padding:5,borderRadius:20}}>
            <FontAwesome5 name="motorcycle"  size={30} color={COLORS.primary}/>
            </View>
          </Marker>
        }
      </MapView>
    </View>
  )
}

export default CommandeMap