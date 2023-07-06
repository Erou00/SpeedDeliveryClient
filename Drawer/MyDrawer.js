import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import Welcome from '../components/home/welcome/Welcome';
import Colis from '../app/colis';

import Commandes from '../app/commandes';
import Tracker from '../app/tracker';
import Statistique from '../app/statistique';
import Profile from '../app/profile';


const Drawer = createDrawerNavigator();
export default function MyDrawer() {
  return (
    <Drawer.Navigator

      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
       <Drawer.Screen name="Acceuil"  component={Welcome}  options={{headerShown:false}}/> 
       <Drawer.Screen name="Profile" component={Profile}  options={{headerShown:false}}/> 
       <Drawer.Screen name="Mes Colis" component={Colis}  options={{headerShown:false}}/> 
       <Drawer.Screen name="Mes Commandes" component={Commandes}  options={{headerShown:false}}/> 
       {/* <Drawer.Screen name="Track commande" component={Tracker}  />  */}
       <Drawer.Screen name="Statistique" component={Statistique}  /> 


    </Drawer.Navigator>
  );
}

