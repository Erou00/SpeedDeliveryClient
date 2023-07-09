import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";




export const display_status = async()=>{
    try {
      const token = await AsyncStorage.getItem("@user") 
      const baseUrl = "/private/status";
      let url = '';
      url = `${baseUrl}/display`
  
      console.log(url);
      const result = await ApiManager(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Authorization': `Bearer ${token}`
          
        },
        });

      return result;
    
    }  
        catch (error) {
        return error.response.data;
    }
}