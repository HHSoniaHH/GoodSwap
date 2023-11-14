//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get("window");
// create a component
const LandigPage = ({navigation}) => {
  return (
    <SafeAreaView style={{  marginTop: StatusBar.currentHeight,height:900,backgroundColor: "rgba(49, 39, 131,1)"}}>
      <View>
        <ImageBackground
          style={{
            height: height / 2.5,
            marginTop: 90,
          }}
          resizeMode="center"
          source={require("../../assets/welcome-img.png")}
        />
      </View>
      <View style={{ paddingTop: 80, paddingHorizontal: 40 }}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "poppins",
            color: "#fff",
            fontSize: 25,
          }}
        >
          Donner une autre vie aux objets utilisés{" "}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "poppins",
            color: "#fff",
            fontSize: 12,
          }}
        >
          Some species live in houses where they hunt insects attracted by
          artificial light.
        </Text>
       
      </View>
      <View style={{paddingTop:80,paddingHorizontal:20 ,justifyContent:"center" ,alignItems:"center"}}>
      <TouchableOpacity
          onPress={() =>
            navigation.navigate('AppForm'
            )
          }
          style={{
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"center",
            backgroundColor: "#fff",
            paddingVertical: 10,
            paddingHorizontal: 40,
            width: "90%",
            borderRadius: 8,
          }}
        >
          <Text
            style={{
                textAlign: "center",
                fontFamily: "poppins",
                color: "rgba(49, 39, 131,1)",
                fontSize: 18,
            }}
          >
          
          Etre impliqué!
         
          </Text>
          <Ionicons
              style={{marginLeft: 90}}
              size={35}
              name={'arrow-forward-outline' }
              color={ 'rgba(49, 39, 131,1)'}
            />
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default LandigPage;
