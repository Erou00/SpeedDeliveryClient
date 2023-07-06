import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";



export const client_register = async data => {

    try {
      
      const result = await ApiManager('/public/clients', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin':'*',
        },
        data: data,
      });

      return result;
    } catch (error) {
      return error.response.data;
    }


}



export const user_login = async data => {

  try {
    const result = await ApiManager('/public/token', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }

};


export const user_info = async (username) => {

try {
  console.log(username);
  const token = await AsyncStorage.getItem("@user")
  const result = await ApiManager(`/private/clients/userinfo?username=${username}`,{
    method:'GET',
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      'Authorization': `Bearer ${token}`
    },
    // params:'hamza'
  })
 
  
  return result;
} catch (error) {
  return error;
}

}

export const client_details =  async(id) => {

  try {
    console.log(id);
    const token = await AsyncStorage.getItem("@user")
    console.log(id);
    const result = await ApiManager(`/private/clients/details?id=${id}`,{
      method:'GET',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization': `Bearer ${token}`
      },
      // params:'hamza'
    })
   
    
    return result;
  } catch (error) {
    return error;
  }

}