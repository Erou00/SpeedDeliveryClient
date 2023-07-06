

import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { View } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { ImageBackground } from 'react-native';
import images from '../constants/images';
import { Image } from 'react-native';
import { FONT } from '../constants';
import { useAuth } from '../context/auth';

const CustomDrawerContent = (props) => {
   const { signOut,user } = useAuth();
 
  return ( 
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#030030'}}>
        <ImageBackground
          source={images.menuBg}
          style={{padding: 10}}>
          <Image
            source={images.profile}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
               fontFamily: FONT.bold,
              marginBottom: 5,
            }}>
            John Doe
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#fff',
                fontFamily: FONT.bold,
                marginRight: 5,
              }}>
              280 Coins
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 10, borderTopWidth: .5, borderTopColor: '#030030'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={18} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: FONT.bold,
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {signOut()}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={18} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: FONT.bold,
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomDrawerContent