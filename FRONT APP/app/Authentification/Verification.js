//import liraries
import React, { Component, useEffect } from "react";
import client from "../api/client";
import { Dimensions, Platform } from "react-native";
import { TextInput } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRef } from "react";
import { Keyboard } from "react-native";
import { useLogin } from "../context/LoginProvider";
import { SignIn } from "../api/user";
import { StackActions } from "@react-navigation/native";
import { Alert } from "react-native";

let newInputIndex = 0;
const inputs = Array(4).fill("");
const isValidObject = (obj) => {
    return Object.values(obj).every(val => val.trim());
  };
// create a component
const Verification = ({ route , navigation,submitting }) => {
  const backgroundColor = submitting
  ? 'rgba(49, 39, 131,0.4)'
  : 'rgba(49, 39, 131,1)';
    const { data } = route.params;
   
    const userId=data.id
    const email=data.email
    const password=data.password

  const input = useRef();
  const [OTP, SetOTP] = useState({ 0: "", 1: "", 2: "", 3: "" });
  const { setIsUser,setIsAdmin,setIsLoggedIn, setProfile, setLoginpending } = useLogin();

  const [nextInputIndex, setNextInputIndex] = useState(0);



  const submitOTP = async () => {
      Keyboard.dismiss();
    
    if (isValidObject(OTP)) {
      let otp = "";
      Object.values(OTP).forEach(v=>{otp+=v})


       await client.post("verifier", {
        otp ,userId      
      }).then(response=>{
console.log(response.data)
        if (response.data.success) {

        //   Alert.alert(response.data.message)
      
          
        
        try {
            SignIn(
              email,
              password,
            ).then(ress=>{
                console.log(ress.data)
                setLoginpending(true);
                if(ress.data.success){
                    navigation.dispatch(
                        StackActions.replace("ImageUpload", {
                          token: ress.data.token,
                        })
                      );
                      setProfile(ress.data.user);
                      setLoginpending(false);
                      setIsUser(true) 
                      setIsAdmin(false)
                }
                
            });
          
          } catch (error) {
            console.log("error in sign in method", error.message);
          }

         

        
        }})
         
       
    }

    
      };
const resetOtp = async () => {
  Keyboard.dismiss();

  try {
    const { data } = await client.post("resetOtp", {
     id: userId,
    });
    console.log(data.success);
    Alert.alert(data.message);
    
  } catch (error) {
    if (error?.response?.data) {
      console.log(error.response.data);
      Alert.alert(error.response.data.message);
      console.log(otp);
    }
    console.error(error);
  }
};
  const handleOnChange = (text, index) => {
    const newOTP = { ...OTP };
    newOTP[index] = text;
    SetOTP(newOTP);
    const lastInputIndex = inputs.length - 1;
    if (!text) {
      newInputIndex = index === 0 ? 0 : index - 1;
    } else {
      newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
    }
    setNextInputIndex(newInputIndex);
  };
  useEffect(() => {
    input.current.focus();
  }, [nextInputIndex]);
  return (
    <KeyboardAvoidingView enabled behavior= {Platform.OS ==='ios' ?  "padding":null} style={styles.container}>
   <Text style={styles.header}>
        Vérifier votre adresse e-mail un code vous a été énvoyé 
      </Text>
      <View style={styles.OTPContainer}>
        {inputs.map((i, index) => {
          return (
            <View style={styles.inputContainer} key={index.toString()}>
              <TextInput
                value={OTP[index]}
                onChangeText={(text) => handleOnChange(text, index)}
                placeholder="X"
                placeholderTextColor={"#87CEEB"}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                ref={nextInputIndex === index ? input : null}
              />
            </View>
          );
        })}
      </View>
      <TouchableOpacity style={[styles.btn,{backgroundColor}]}  
       onPress={!submitting ? submitOTP : null}
       >
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Vérifier
            <Ionicons
              size={35}
              style={styles.icon}
              name={"checkmark"}
              color={"white"}
            />
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btnResent,]}   
      onPress={!submitting ? resetOtp : null}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.text,{color:'blue'}]}>
            Renvoyer
           
           <Ionicons
              size={25}

              name={"sync"}
              color={"blue"}
            />
          </Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
const { width } = Dimensions.get("window");
const inputWidth = Math.round(width / 6);
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 200,
  
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    color: "blue",
    padding: 15,
    marginBottom: 25,
    fontFamily: "poppins",
  },
  inputContainer: {
    width: inputWidth,
    height: inputWidth,
    borderWidth: 2,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderColor: "blue",
  },
  OTPContainer: {
    flexDirection: "row",
    gap: 15,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    fontSize: 25,
    textAlign: "center",
  },
  btn: {
   
    width: 200,
    marginTop: 20,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 150,
    
  },
  btnResent: {
    marginTop: 20,

  
    width: 200,

    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 150,

  },
  text: {
    fontSize: 22,
    textAlign: "center",
    color: "white",
    fontFamily: "poppins",
    alignSelf: "center",
  },
  textContainer: { alignSelf: "center" },
  icon: {
    marginTop:45,

  },
});

//make this component available to the app
export default Verification;
