import * as React from 'react';
import {SafeAreaView } from 'react-native';
import { COLORS, icons, images } from "../constants";
import MyDrawer from '../Drawer/MyDrawer'



export default function App() {

  return (
   
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>

          <MyDrawer />

    </SafeAreaView>
    
   
  );
} 