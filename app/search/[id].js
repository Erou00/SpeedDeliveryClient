import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { COLORS, icons } from '../../constants'
import ScreenHeaderBtn from '../../components/common/header/ScreenHeaderBtn'

const colisSearch = () => {
  const params = useSearchParams();
  const router = useRouter();
 
  useEffect(()=>{
    console.log(params.id);
  },[])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
    <Stack.Screen
        options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => (
                <ScreenHeaderBtn
                    iconUrl={icons.left}
                    dimension='60%'
                    handlePress={() => router.back()}
                />
            ),
            headerTitle: "",
        }}
    />
    <View>
      <Text>{params.id}</Text>
    </View>
    </SafeAreaView>
  )
}

export default colisSearch