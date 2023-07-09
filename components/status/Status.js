import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../constants'
import { useEffect } from 'react'
import { display_status } from '../../app/api/axios_statut'
import AsyncStorage from '@react-native-async-storage/async-storage'



const Status = ({tabHandler}) => {


  const [states,setStates] = useState([])
    const [activeState,setActiveState] = useState('EN STOCK')

    const changeActiveState = (item)=>{
        setActiveState(item);
    }

   const functionCombined = (item)=> {
        tabHandler(item)
       changeActiveState(item)
    //     console.log(activeState);
    }

    const getStatus = async() =>{
      const token = await AsyncStorage.getItem("@user") 
      if (token) {
        await display_status().then(({data})=>{
          console.log(data);
          setStates(data.data) 
         })
      }
     
    }
 
    useEffect(()=>{
      getStatus()
    },[])
  return (
    <View style={styles.tabsContainer}>
    <FlatList 
            data={states }
            renderItem={({item}) => (
            <TouchableOpacity
                style = {styles.tab(activeState,item)}
                onPress={()=> functionCombined (item.statut)}>
                <Text style={styles.tabText(activeState,item)}>{item.statut}</Text>
            </TouchableOpacity>
            )} 
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle= {{columnGap:SIZES.small}}
            horizontal
        

        />
    </View> 
  )
}

const styles = StyleSheet.create({
    tabsContainer: {
        width: "100%",
        marginTop: SIZES.medium,
      },
      tab: (activeState, item) => ({
        paddingVertical: SIZES.small / 2,
        paddingHorizontal: SIZES.small,
        // borderRadius: SIZES.medium,
        backgroundColor: activeState === item ? COLORS.tertiary : COLORS.white,

        borderWidth: 1,
        borderRadius:5,
        
        borderColor: activeState === item ? COLORS.tertiary : COLORS.primary,

      }),
      tabText: (activeState, item) => ({
        fontFamily: FONT.bold,
        color: activeState === item ? COLORS.lightWhite : 'black',
      }),
})
export default Status