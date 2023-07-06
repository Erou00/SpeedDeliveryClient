import { View, Text, StyleSheet,Image , TextInput, ScrollView, FlatList, TouchableOpacity, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONT, SIZES, icons, images } from '../../constants'

import { useRouter } from 'expo-router'
import { ImageBackground } from 'react-native'
import { Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native'
import { delete_pack_by_id, get_myPacks } from '../api/axios_pack'
import ColisDefaultCard from '../../components/common/cards/colis/ColisDefaultCard'
import { useAuth } from '../../context/auth'





const Colis = () => {
  const[packs,setPacks] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


  const [value, setValue] = useState('');
  const [searchText,setSearchText] = useState('');


  const [selectedColis,setSelectedColis] = useState();


  const [isLoading, setIsLoading] = useState(true);


  const { userInfo } = useAuth()
  const router = useRouter();

  const getPacks = async (pageNumber) => {

      await get_myPacks(userInfo.id,searchText,pageNumber,6)
        .then(({data})=>{
           setPacks([...packs,...data.data.content])
           setTotalPages(data.data.totalPages)
           setCurrentPage(currentPage+1); 

        }) 
        .catch(err => {console.log(err);})
        .finally(()=>{
          setIsLoading(false);
        })

  }


  const handleCardPress = (item) => {
      router.push(`colis/detail-colis/${item.id}`)
      setSelectedColis(item.id)
    
  }

  const handleEndReached = () => {
  
    let numPage = currentPage+1
    if (numPage <= totalPages ) {
      setCurrentPage(currentPage+1)    
      getPacks(currentPage)  
    }
    console.log('outside + '+ currentPage +" total :" + totalPages);
  };

  const handleDoneButtonPress = () => {
    setPacks([])
    setIsLoading(true)
    setCurrentPage(0);
    setSearchText(value);
    console.log(currentPage);

  };

  const deletePack = async (id) => {
     await delete_pack_by_id(id).then(({data})=>{
      if (data.status === 200) {
        setPacks((prevData) => prevData.filter((obj) => obj.id !== id));
      }      
    }).catch(err => console.log(err)).finally(()=>{
    })
  }
  
  useEffect(()=>{
    getPacks(currentPage)
  },[searchText])



  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={{ alignItems: 'center', paddingVertical: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return(
    
    <SafeAreaView style={{flex:1,backgroundColor:'white',marginTop:25}}>
       <ImageBackground  source={images.menuBg}
          style={{height: Dimensions.get('window').height / 6}} resizeMode='cover'
          >

          <Ionicons
                    onPress={() => router.back()}
                    name="arrow-back-circle"
                    size={30}
                    color="#fff"
                    style={
                      { top: 30,
                        left: 10, position: "absolute",zIndex:1000 }}
          />
              <View style={styles.brandView}>         
              <Text style={styles.brandViewText}>MES COLIS</Text>
              </View>
              
        </ImageBackground>

        <View style={styles.bottomView}>
            <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>  
              <TextInput
                  style={styles.searchInput}
                  value={value}
                  onChangeText={(text) => setValue(text)}
                  onSubmitEditing={handleDoneButtonPress} 

                  placeholder="Chercher par titre"
                  
                />
            </View>
            <TouchableOpacity style={styles.searchBtn} 
                onPress={()=>{router.push('colis/ajouter-colis')}}>
                  <Image 
                    source={icons.add}
                    resizeMode='contain'
                    style={styles.searchBtnImage}
                  />
                </TouchableOpacity>
            </View>
          </View>
     
         
          
            
         
    <View style={styles.container}>
      <FlatList
        
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        onEndReachedThreshold={0.1}
        onEndReached={handleEndReached}
        data={packs}
        horizontal={false}
        numColumns={2}
        keyExtractor={item => {
          return item.id
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />
        }}
        renderItem={pack => {
          const item = pack.item
          return (
              <ColisDefaultCard key={pack.item.id}  item={item}  handleCardPress={handleCardPress} deletePack={deletePack}  />
          )
        }}
         ListFooterComponent={renderFooter}
        />
        </View>
            
       
          

   
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  brandView : {
    flex:1,
    justifyContent:'center',
    alignItems:'center',

  },

  brandViewText:{
    color:'#fff',
    fontSize:30,
    fontWeight:'bold',
    textTransform : 'uppercase',
    fontStyle:'italic',
  
  },

  bottomView:{
    // flex:1.5,
    // height:Dimensions.get('window').height- (Dimensions.get('window').height / 4),
    backgroundColor: 'white',
    top:-20,
    borderTopStartRadius:20,
    borderTopEndRadius:20,
    padding:5
  },

  searchContainer :{justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },

  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },

  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },

  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },

  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  cardsContainer:{

    // marginTop:55,
    flexDirection:'row',
    // // flex:1,
    // flexWrap: 'wrap',

    // alignItems: 'center'
  },


  container: {
    flex: 1,
    marginTop: 5,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
  },
  listContainer: {
    // alignItems: 'center',
  },
  separator: {
    marginTop: 10,
  },

})
export default Colis