import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Address = () => {
  return (
    <GooglePlacesAutocomplete
    styles={{height:'100%'}}
    placeholder='Search'
    onPress={(data, details = null) => {
      // 'details' is provided when fetchDetails = true
      console.log(data, details);
    }}
    query={{
      key: 'AIzaSyAsGOSLFI83LZqcFOda1zltJ9DfUuLCHyA',
      language: 'en',
    }}
  />
  )
}

export default Address
