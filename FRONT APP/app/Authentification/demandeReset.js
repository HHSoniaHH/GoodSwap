//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import FormHeader from "./FormHeader";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";

// create a component
const DemandeReset = () => {
  return (
    <View style={{ flex: 1, paddingTop: 120, }}>

        <FormHeader/>
        <View
          style={{ alignItems: "center",paddingTop: 80,gap:15, justifyContent: "center" }}
     
        >
            <Text style={{fontSize:22,fontFamily:'poppins',color:'blue' }}>
                Mot de passe oublie
            </Text>
            <FormInput
                
                autoCapitalize="none"
                secureTextEntry
         
                placeholder="Adresse email"
              />
 
        <FormSubmitButton
          
            title="Envoyer"/>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
});

//make this component available to the app
export default DemandeReset;
