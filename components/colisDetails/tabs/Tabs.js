import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONT, SHADOWS, SIZES } from '../../../constants'



const TabButton = ({name,activeTab,onHandleSearchType}) => (
  <TouchableOpacity
   style={styles.btn(name,activeTab)}
   onPress={onHandleSearchType}>
    <Text style={styles.btnText(name,activeTab)}>{name}</Text>
  </TouchableOpacity>
)
const Tabs = ({tabs,activeTab,setActiveTab}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({item})=> (
          <TabButton 
            name={item}
            activeTab={activeTab}
            onHandleSearchType={()=> setActiveTab(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        contentContainerStyle={{columnGap:SIZES.large }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    marginTop: SIZES.xSmall,
    marginBottom: SIZES.xSmall / 2,
    
  },
  btn: (name, activeTab) => ({
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xLarge,
    backgroundColor: name === activeTab ? COLORS.primary : "#F3F4F8",
    borderRadius: SIZES.medium,
    marginLeft: 2,
    marginTop:2,
    marginBottom:2,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  btnText: (name, activeTab) => ({
    fontFamily: FONT.medium,
    fontSize: SIZES.small,
    color: name === activeTab ? "#C3BFCC" : "#AAA9B8",
  }),
});

export default Tabs