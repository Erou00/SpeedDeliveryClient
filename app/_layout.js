

import { Slot, Stack} from 'expo-router'
import React, { useCallback, useEffect } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { Provider, useAuth } from '../context/auth'
import { PanGestureHandler } from 'react-native-gesture-handler'
import {Root as PopupRootProvider} from 'react-native-popup-confirm-toast';


SplashScreen.preventAutoHideAsync()
const _layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold : require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium : require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular : require('../assets/fonts/DMSans-Regular.ttf'),
    chelseaMarket : require('../assets/fonts/chelsea-market-regular.ttf'),
    Caprasimo : require('../assets/fonts/Caprasimo-Regular.ttf'),
  })



  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
        await SplashScreen.hideAsync();
    }

  },[fontsLoaded])

  if (!fontsLoaded) return null;

  return (
    <Provider>
      <PopupRootProvider>
        <Slot />
      </PopupRootProvider>
    </Provider>
  ) 
}

export default _layout