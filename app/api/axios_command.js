import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";


export const get_myAllCommands = async(clientId,address,pack_id,currentPage)=>{
    try {
      const token = await AsyncStorage.getItem("@user") 
      const baseUrl = "/private/commandes";
      let url = '';
      url = `${baseUrl}/my-commands?clientId=${clientId}&address=${address}&packId=${pack_id}&page=${currentPage}&size=6`
  
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

export const add_commande = async data => {

  try {
    console.log(data);
    const token = await AsyncStorage.getItem("@user")
    const result = await ApiManager('/private/commandes', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Authorization': `Bearer ${token}`
        
      },
      data:data
    });
    return result;
  } catch (error) {
    return error.response.data;
  }


}


export const update_commande = async (commande_id,data) => {

  try {
    const token = await AsyncStorage.getItem("@user")
    const baseUrl = "/private/commandes";
    let url = '';
    url = `${baseUrl}/${commande_id}/update`
    const result = await ApiManager(url, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Authorization': `Bearer ${token}`
        
      },
      data:data
    });

    return result;
  } catch (error) {
    return error.response.data;
  }


}

export const get_commande_by_id = async (commande_id) => {
  try {
    const token = await AsyncStorage.getItem("@user")
    const baseUrl = "/private/commandes";
    let url = '';
    url = `${baseUrl}/${commande_id}`
    

    const result = await ApiManager(url, {
      method: 'GET',
      //  withCredentials:true,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization': `Bearer ${token}`
      },
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};



export const delete_commande_by_id = async (commande_id) => {

  try {
    const token = await AsyncStorage.getItem("@user")
    const baseUrl = "/private/commandes";
    let url = '';
    url = `${baseUrl}/${commande_id}/delete`
    

    const result = await ApiManager(url, {
      method: 'DELETE',
      //  withCredentials:true,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization': `Bearer ${token}`
      },
    });
    return result;
  } catch (error) {
    return error.response.data;
  }

};



export const latest_commandes = async(clientId) => {


  try {
    const token = await AsyncStorage.getItem("@user")
      const baseUrl = "/private/commandes";
      let url = '';
      url = `${baseUrl}/my-latest-commandes/${clientId}`
      
    const result = await ApiManager(url, {
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Authorization': `Bearer ${token}`
        
      },
    });


    return result;
  } catch (error) {
    return error.response.data;
  }


}