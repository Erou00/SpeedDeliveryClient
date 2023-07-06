import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";


export const get_all_categories = async () => {
  try {
    const url = "/private/categories/all-categories";
    const token = await AsyncStorage.getItem("@user")
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


export const add_pack = async data => {

    try {
      const token = await AsyncStorage.getItem("@user")
      const result = await ApiManager('/private/packs', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin':'*',
            'Authorization': `Bearer ${token}`
          
        },
        data
      });

      return result;
    } catch (error) {
      return error.response.data;
    }


}


export const get_myPacks = async(clientId,name,currentPage,packsPerPage)=>{
      try {
        let title = name
        const token = await AsyncStorage.getItem("@user")
          const baseUrl = "/private/packs"; 
          let url = '';
          url = `${baseUrl}/my-packs?clientId=${clientId}&name=${title}&page=${currentPage}&size=${packsPerPage}`
          
          console.log("url : " + url);
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


export const get_myAllPacks = async(clientId)=>{
  try {
    const token = await AsyncStorage.getItem("@user")
      const baseUrl = "/private/packs";
      let url = '';
      url = `${baseUrl}/my-packs?clientId=${clientId}&name=`
      
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


export const get_pack_by_id = async (pack_id) => {
    try {
      const token = await AsyncStorage.getItem("@user")
      const baseUrl = "/private/packs";
      let url = '';
      url = `${baseUrl}/${pack_id}`
      

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



export const update_pack = async (pack_id,data)=> {

    try {
      const token = await AsyncStorage.getItem("@user")
        const baseUrl = "/private/packs";
        let url = '';
        url = `${baseUrl}/${pack_id}/update`
        
      const result = await ApiManager(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin':'*',
            'Authorization': `Bearer ${token}`
          
        },
        data,
      });

      console.log(result);

      return result;
    } catch (error) {
      return error.response.data;
    }


}  


export const delete_pack_by_id = async (pack_id) => {

  try {
    const token = await AsyncStorage.getItem("@user")
    const baseUrl = "/private/packs";
    let url = '';
    url = `${baseUrl}/${pack_id}/delete`
    

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

/////

export const get_packs_filtre = async(clientId)=>{
  try {
    const token = await AsyncStorage.getItem("@user")
      const baseUrl = "/private/packs";
      let url = '';
      url = `${baseUrl}/my-packs-flitre/${clientId}`
      
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


export const latest_packs = async(clientId) => {


  try {
    const token = await AsyncStorage.getItem("@user")
      const baseUrl = "/private/packs";
      let url = '';
      url = `${baseUrl}/my-latest-packs/${clientId}`
      
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