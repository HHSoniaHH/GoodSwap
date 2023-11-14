import React, { useState } from "react";
import { View, StyleSheet, Text, ToastAndroid, Alert } from "react-native";
import client from "../api/client";
import { SignIn } from "../api/user";
import { useLogin } from "../context/LoginProvider";
// import { useLogin } from '../context/LoginProvider';
import { isValidEmail, isValidObjField, updateError } from "../utils/methods";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import Toast from "react-native-toast-message";
import { Button } from "react-native-paper";

const LoginForm = () => {
  const { setIsLoggedIn, setProfile, setIsAdmin ,setIsUser} = useLogin();
  const { setLoginpending } = useLogin();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { email, password } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Tous les champs doivent etre remplies!", setError);

    if (!isValidEmail(email))
      return updateError(" Adresse email invalide!", setError);

    if (!password.trim() || password.length < 8)
      return updateError(
        "Le mot de passe doit etre entre 8 et 20 caractères!",
        setError
      );

    return true;
  };

  const submitForm = async () => {
    setLoginpending(true);
    if (isValidForm()) {
      try {
        const res = await SignIn(userInfo.email, userInfo.password);
        if (res.data.success) {
          setUserInfo({ email: "", password: "" });
          setProfile(res.data.user);
          setIsLoggedIn(true);
          if (res.data.user.UserType === "Organisateur") {
            console.log("oui Organisateur");
            setIsAdmin(true)
            setIsUser(false)
            
          }else {setIsUser(true) 
            setIsAdmin(false)}
          
        } else {
          Alert.alert("Connexion échoué", res.data.message);
          // setUserInfo({ email: '', password: '' });
        }

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    setLoginpending(false);
  };

  return (
    <>
      <FormContainer>
        {error ? (
          <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
            {error}
          </Text>
        ) : null}
        {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
        <FormInput
          value={email}
          onChangeText={(value) => handleOnChangeText(value, "email")}
          label="Adresse email"
          placeholder="Entrer ton adresse email"
          autoCapitalize="none"
        />
        <FormInput
          value={password}
          onChangeText={(value) => handleOnChangeText(value, "password")}
          label="Mot de passe"
          placeholder="Entrer ton mot de passe"
          autoCapitalize="none"
          secureTextEntry
        />
        <FormSubmitButton onPress={submitForm} title="Se Connecter" />
      </FormContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;
