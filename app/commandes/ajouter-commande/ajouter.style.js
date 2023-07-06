import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../../../constants";

const styles = StyleSheet.create({
    test:{},
    container: {
      flex: 1,
    },
    header: {
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: '#ccc',
      backgroundColor:COLORS.primary
    },
    title: {
      color:COLORS.lightWhite,
      fontSize: 20,
      fontFamily:FONT.bold,
      textTransform:'uppercase'
    },
    content: {
      flex: 1,
      borderTopRightRadius:20,
      borderTopLeftRadius:20,
      marginTop:-20,
      zIndex:100,
      paddingHorizontal: 20,
      paddingTop: 20,
      backgroundColor:COLORS.lightWhite
    },
    label:{
      marginTop:30,
      marginBottom:5,
      fontFamily:FONT.medium,
      
    },
    address:{
      // marginTop:30,
      marginBottom:5,
      fontFamily:FONT.medium,
      
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
    },
    footer: {
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ccc',
    },
    footerText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  })

  export default styles;
