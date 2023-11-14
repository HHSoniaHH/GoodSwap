import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "./client";

export const SignIn = async (email, password) => {
  try {
    const signInRes = await client.post("/login", {
      email,
      password,
    });
    if (signInRes.data.success) {
      const token = signInRes.data.token;

      await AsyncStorage.setItem("token", token);

    }
    return signInRes;
  } catch (error) {
    console.log("error in sign in method", error.message);
  }
};

export const SignOut = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (token !== null) {
      const res = await client.get("/logout", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      if (res.data.success) {
        await AsyncStorage.removeItem('token');

        return true;
      }
    }
    return false;
  } catch (error) {
    console.log("error in sign out method", error.message);
    return false
  }
};
