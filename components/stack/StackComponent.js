import { View, Text } from 'react-native'
import React from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { COLORS, icons, images } from '../../constants'
import ScreenHeaderBtn from '../common/header/ScreenHeaderBtn'

const StackComponent = () => {

  const navigation = useNavigation()  
  return (
    <Stack.Screen 
        options={{
        headerShown:true,
        headerStyle : {backgroundColor:COLORS.lightWhite},
        headerShadowVisible:false,
        headerLeft : ()=> (
            <ScreenHeaderBtn 
            iconUrl = {icons.menu}
            dimension ="60%" 
            handlePress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            

            />
        ),
        headerRight : ()=>(
            <ScreenHeaderBtn 
            iconUrl = {images.profile}
            dimension ="100%"  />
        ),
        headerTitle:""
        
        }}
    />
  )
}

export default StackComponent