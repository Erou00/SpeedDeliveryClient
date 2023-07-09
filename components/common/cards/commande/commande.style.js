import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
      shadowColor: '#00000021',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
  
      marginVertical: 10,
      marginHorizontal: 2,
      backgroundColor: 'white',
      borderLeftWidth: 6,
      padding: 10,
  
      // flexBasis: '46%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    content: {
        marginLeft: 16,
        flex: 1,
      },
      contentHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 6,
      },
      separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
      },
      image: {
        width: 25,
        height: 25,
      },
      time: {
        fontSize: 11,
        color: '#808080',
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
        padding:5
      },
      description: {
        fontSize: 18,
        flex: 1,
        color: '#008080',
        fontWeight: 'bold',
        marginBottom:5
      },
  });
  
  export default styles; 