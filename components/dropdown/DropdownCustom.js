import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS, FONT } from '../../constants';
import { useEffect } from 'react';





const DropdownCustom = ({data,handleChange,id,handleChangeItem}) => {

  
  const [selectedValue, setSelectedValue] = useState(id);

  const [hasAffectedOnce, setHasAffectedOnce] = useState(false);

  if (!hasAffectedOnce && id !== selectedValue) {
    setSelectedValue(id);
    setHasAffectedOnce(true);
  }

  const handleDropdownChange = (value) => {
    // console.log(value);
    // handleChange(String(value.id)) 
    setSelectedValue(value.id);
    handleChangeItem(value)
    
  };

  useEffect(()=> {
    if (id) {
      console.log('fff');
      setSelectedValue(id)
    }
    
  },[])
  return (
    <View>
      <Dropdown
      style={styles.dropdown}
    
         placeholder=''
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        data={data}
        value={selectedValue}
        onChange={handleDropdownChange}
        labelField="name"
        valueField="id"
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      paddingVertical: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
    //   borderWidth: 0.2,
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor: 'rgb(220,220, 220)', 
    },
    icon: {
      marginRight: 5,
      fontWeight:'bold'
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      fontFamily:FONT.medium,
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      fontFamily:FONT.medium,
    },
    selectedTextStyle: {
      fontSize: 16,
      fontFamily:FONT.medium,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    itemTextStyle:{
      fontFamily:FONT.medium
    }
  });

export default DropdownCustom