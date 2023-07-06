import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { NativeBaseProvider, Select } from 'native-base'
import { COLORS, FONT, SIZES } from '../../constants';

const Dropdown = ({bgColor}) => {
    const [service, setService] = useState("");
  return (
    <NativeBaseProvider>
        <View style={{marginVertical:5}}>
            <Select selectedValue={service} minWidth="100%" accessibilityLabel="Choose Service"
                    placeholder="Choose Service" style={{borderColor:COLORS.white}}
                    backgroundColor={bgColor} borderColor={'white'} borderRadius={5}
                    height={50} placeholderTextColor={'#4c4c4c'}
                    fontFamily={FONT.chelseaMarket} fontWeight={'bold'} 
                     color={COLORS.primary} _selectedItem={{color:COLORS.primary,bg:COLORS.gray2}}  _text={{
                    color:COLORS.tertiary,
                    bg:COLORS.primary
                    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                        <Select.Item label="" value=""  />
                        <Select.Item label="UX Research" value="ux"  />
                        <Select.Item label="Web Development" value="web" />
                        <Select.Item label="Cross Platform Development" value="cross" />
                        <Select.Item label="UI Designing" value="ui" />
                        <Select.Item label="Backend Development" value="backend" />
            </Select>
        </View>
    </NativeBaseProvider>
   
  )
}

export default Dropdown