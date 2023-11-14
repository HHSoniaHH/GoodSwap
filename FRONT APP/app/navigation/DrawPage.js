import "react-native-reanimated";
import "react-native-gesture-handler";
import * as React from "react";
import { createDrawerNavigator ,DrawerContentScrollView,
  DrawerItemList,} from "@react-navigation/drawer";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import Friends from "../components/Friends";
import Search from "../components/Discussion";
import HomeScreen from "./Pub";
import Profile from "../components/Profile";
import Principale from "./Principale";
import { View } from "react-native";
import { useLogin } from "../context/LoginProvider";
import { SignOut } from "../api/user";
import MyImage from '../../assets/defaultProfile.png';
import { Ionicons } from '@expo/vector-icons';

function CustomDrawerContent(props) {
  const { setIsLoggedIn, profile,setLoginpending,setIsUser } = useLogin();
  const imageUri = Image.resolveAssetSource(MyImage).uri;

  return (

       <View style={{ flex: 1 ,width:295}}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            backgroundColor: 'rgba(49, 39, 131,0.7)',
            marginBottom: 20,
            borderBottomEndRadius:15,
            borderTopEndRadius:15,
          }}
        >
          <View>
          <View style={{flexDirection:'row' ,fontSize:8 ,fontFamily:'poppins'}}>
          <Text style={{color:'#fff',fontFamily:'poppins'}}>{profile.fname}</Text>
          <Text style={{color:'#fff',fontFamily:'poppins'}}>   {profile.lname}</Text>
          </View>
            <Text style={{fontSize:10 ,fontFamily:'poppins' ,color:'#fff'}}>{profile.email}</Text>
          </View>
          <Image
             source={{
              uri:
                profile.avatar ||
                imageUri
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
      <DrawerItemList  {...props} />
    
    </DrawerContentScrollView>
    <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          flex:1,
          backgroundColor: 'rgba(220,20,60,0.5)',
          borderBottomEndRadius:15,
          borderTopEndRadius:15,
          flexDirection:'row',
          justifyContent:'space-between',
         
          padding: 20,
        }}
        onPress={async () =>  {
          setLoginpending(true)
          const isLoggedOut = await SignOut()
          if(isLoggedOut){
            setIsLoggedIn(false)
            setIsUser(false)
          }
          setLoginpending(false)

        }} 
      >
        <Text style={{ color:'white', fontFamily:'poppins' ,fontSize:18}} >Déconnecter </Text>
        <Ionicons
              size={27}
              name={'log-out-outline' }
              color={ '#ffffff'}
            />
      </TouchableOpacity>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawPage() {
 
  return (
    <Drawer.Navigator  screenOptions={{
      drawerStyle: {
        backgroundColor: 'rgba(133, 110, 213,1)',
        width: 300,
      }, drawerLabelStyle: { color: 'white',fontFamily:'poppins' } 
    
    }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen options={{ headerShown: false, }}  component={Principale} name="UserHome" />
      <Drawer.Screen options={{ headerShown: false, }}component={Friends} name="Friends" />
      <Drawer.Screen  options={{headerShown: false, }}component={HomeScreen} name="Home" />
      <Drawer.Screen options={{ headerShown: false }}component={Search} name="Search" />
      <Drawer.Screen options={{ headerShown: false }}component={Profile} name="Profile" />

    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


