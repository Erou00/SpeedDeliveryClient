import axios from "axios";



export const  handleGeocode = async (address) => {
    try {

    const result = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: 'AIzaSyAsGOSLFI83LZqcFOda1zltJ9DfUuLCHyA',
        },
      })
      return result;
    } catch (error) {
      return error.response.data;
    }

  };