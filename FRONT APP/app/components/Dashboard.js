import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { useLogin } from '../context/LoginProvider';
import { Ionicons } from '@expo/vector-icons';
import { SignOut } from '../api/user';

// create a component
const Dashboard = () => {
    const { setIsLoggedIn, setIsAdmin,setLoginpending } = useLogin();

    return (
      <View style={styles.container}>
        <Text>Organisateur</Text>
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
              setIsAdmin(false)
  
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
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  

//make this component available to the app
export default Dashboard;
