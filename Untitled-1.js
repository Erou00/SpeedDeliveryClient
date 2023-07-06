import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useSegments } from "expo-router";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";

const AuthContext = React.createContext();

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    // console.log(user);
    // console.log(AsyncStorage.getItem('@user'));
    // console.log(segments);
    
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/login");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
}





export function Provider(props) {

  const [user, setAuth] = useState(null);
  const [username,setUsername] = useState(null);

  useProtectedRoute(user);


  _verifyToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@user');
      if (value !== null) {
        setAuth(value)
        decodeToken(value)
        console.log(username);
      }else{
        setAuth(null)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    _verifyToken()
  },[])
  
  const logToken = async ()=>{
    let token = await AsyncStorage.getItem('@user')
    console.log(token);
  }

  const decodeToken = (userToken)=>{
    const token = userToken;
    const decodedToken = jwtDecode(token);
    setUsername(decodedToken.sub);
  }

  const signIn = async (token) => {
    // const jsonValue = JSON.stringify(user)
    await AsyncStorage.setItem('@user',token)
    setAuth(token)
    decodeToken(token)
    console.log(username);
  }
  const signOut = async () => {
    await AsyncStorage.removeItem('@user')
    logToken()
    setAuth(null)

  }
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        username,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export const useStateContext = () => useContext(AuthContext);
