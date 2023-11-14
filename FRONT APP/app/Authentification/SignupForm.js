import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import Toast from "react-native-toast-message";

import { isValidEmail, isValidObjField, updateError } from "../utils/methods";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { StackActions } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";

import { Formik } from "formik";
import * as Yup from "yup";

import client from "../api/client";
import { useLogin } from "../context/LoginProvider";
import { SignIn } from "../api/user";
import { RadioButton } from "react-native-paper";

const validationSchema = Yup.object({
  fname: Yup.string()
    .trim()
    .min(3, "Inserez un nom entre 3 et 20!")
    .required("Vous devez inserez un nom!"),
  lname: Yup.string()
    .trim()
    .min(3, "Inserez un prénom entre 3 et 20!")
    .required("Vous devez inserez un prénom!"),
  email: Yup.string()
    .email("Vous devez inserez une adresse email valide!")
    .required("Vous devez inserez une adesse email!"),
  password: Yup.string()
    .trim()
    .min(8, "Inserez un mot de passe entre 8 et 20!")
    .required("Vous devez inserez un mot de passe!"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "les mots passes ne sont pas cohérents!"
  ),
});

const SignupForm = ({ navigation }) => {
  const { setIsUser,isLoggedIn, setProfile, setLoginpending } = useLogin();
  const [open, setOpen] = useState(false);
  const userInfo = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    UserType: "Utilisateur",
  };


  const signUp = async (values, formikActions) => {
    
    const res = await client.post("/cree", {
      ...values,
    });

    console.log(res.data);
    if (res.data.success) {
      // const signInRes = await SignIn(values.email, values.password);
      const data = { 
        id: res.data.data._id,
        email: values.email,
        password: values.password
      };
      // setLoginpending(true);
      // if (signInRes.data.success) {
        
        navigation.navigate("Verification",{data}
          // {
            // token: signInRes.data.token,
          // }
          
        );
      //   setProfile(signInRes.data.user);


      // }
    }else{
      Toast.show({
        type:"error",
        text1:"Connexion échoué"
        ,text2:res.data.message,
        position:'bottom',
        autoHide:true
      })
   
     
   
    }
    // formikActions.resetForm();
    setLoginpending(false);

   
    formikActions.setSubmitting(false);
  };

  return (
    <FormContainer>

      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { fname, lname, email, password, confirmPassword, UserType } =
            values;
          return (
            <>
              <FormInput
                value={fname}
                error={touched.fname && errors.fname}
                onChangeText={handleChange("fname")}
                onBlur={handleBlur("fname")}
                label="Nom"
                placeholder="Entrer un nom"
              />
              <FormInput
                value={lname}
                error={touched.lname && errors.lname}
                onChangeText={handleChange("lname")}
                onBlur={handleBlur("lname")}
                label="Prénom"
                placeholder="Entrer un prénom"
              />
              <FormInput
                value={email}
                error={touched.email && errors.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                autoCapitalize="none"
                label="Adresse email"
                placeholder="exemple@app.com"
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                autoCapitalize="none"
                secureTextEntry
                label="Mot de passe"
                placeholder="Entrer un mot de passe"
              />
              <FormInput
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                autoCapitalize="none"
                secureTextEntry
                label="Confirmer ton mot de passe"
                placeholder="Confirmer ton mot de passe"
              />
            
              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="Creer un compte"
              />
                        {/* <Toast ref={(ref)=>(Toast.setRef(ref))}/> */}

            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default SignupForm;
