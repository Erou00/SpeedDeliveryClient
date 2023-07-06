import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { COLORS, FONT, SIZES } from '../../constants'


const states = ['EN STOCK' ,'EN COURS','LIVREE','RETOUR']
const Status = ({tabHandler}) => {

    const [activeState,setActiveState] = useState('EN STOCK')
    const changeActiveState = (item)=>{
        setActiveState(item);
    }

   const functionCombined = (item)=> {
        tabHandler(item)
       changeActiveState(item)
    //     console.log(activeState);
    }
  return (
    <View style={styles.tabsContainer}>
    <FlatList 
            data={states }
            renderItem={({item}) => (
            <TouchableOpacity
                style = {styles.tab(activeState,item)}
                onPress={()=> functionCombined (item)}>
                <Text style={styles.tabText(activeState,item)}>{item}</Text>
            </TouchableOpacity>
            )} 
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item}
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