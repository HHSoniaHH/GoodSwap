import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, Pressable } from "react-native";
import { Alert } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { Image } from "react-native";
import { Modal } from "react-native";
import { StyleSheet } from "react-native";
import { View, SafeAreaView, FlatList } from "react-native";
import client from "../api/client";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import { NFTCard, HomeHeader, FocusedStatusBar } from "../components";
import ConfirmationModal from "../components/confirmationModal";
import { COLORS, NFTData } from "../constants";
import { useLogin } from "../context/LoginProvider";

const Homels = () => {
  const [nftData, setNftData] = useState(NFTData);
  const { profile, setProfile } = useLogin();
  const { posts, setPosts } = useLogin();

  const [modalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    prix: "",
    desc: "",
    image: null,
    catigorie: "",
    type: "don",
    createdBy:profile.id
  });

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.canceled) {
        const source = { uri: response.uri };
        setFormData({ ...formData, image: source });
      }
    }
  };

  const handleSubmit = async () => {
    const { nom, prix, desc, catigorie, type, image ,createdBy } = formData;
    const token = await AsyncStorage.getItem("token");

    // Create form data object to send to server
    const data = new FormData();
    data.append("nom", nom);
    data.append("prix", prix);
    data.append("desc", desc);
    data.append("catigorie", catigorie);
    data.append("type", type);
    data.append("createdBy", createdBy);
    data.append("article", {
      uri: image.uri,
      type: "image/jpeg", // Change according to your image type
      name: "product_image.jpg", // Change according to your image nom
    });

    // Send data to server using POST request
    client
      .post("createP", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        console.log("Product added successfully");

        setModalVisible(!modalVisible)
        getAllPosts();
      })
      .catch((error) => {
        console.log("Error adding product:", error);
      });
  };
  const deleteUser = async (id) => {
    const token = await AsyncStorage.getItem('token');

     await client.delete(`deleteArticle/${id}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      }).then((res=>{
        console.log(res.data.message)
        getAllPosts()
        Alert.alert("Supprimer avec succées", res.data.message);
      }))
    
    }
  const getAllPosts = async () => {
    const token = await AsyncStorage.getItem("token");

    client
      .get(`${profile.id}/articles`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
 
 <View style={styles.container}>
        <Modal
          style={styles.centeredView}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Ajouter un nouveau post</Text>

              <TextInput
                placeholder="Nom du produit"
                onChangeText={(text) => setFormData({ ...formData, nom: text })}
                value={formData.nom}
                placeholderTextColor="#A8A8A8"
                style={styles.input}
              />
              <TextInput
                placeholder="Prix"
                onChangeText={(text) =>
                  setFormData({ ...formData, prix: text })
                }
                value={formData.prix}
                placeholderTextColor="#A8A8A8"
                style={styles.input}
              />

              <TextInput
                placeholder="Description"
                onChangeText={(text) =>
                  setFormData({ ...formData, desc: text })
                }
                value={formData.desc}
                placeholderTextColor="#A8A8A8"
                style={styles.input}
              />
              <TextInput
                placeholder="Catigorie"
                onChangeText={(text) =>
                  setFormData({ ...formData, catigorie: text })
                }
                value={formData.catigorie}
                placeholderTextColor="#A8A8A8"
                style={styles.input}
              />
              <TouchableOpacity onPress={openImageLibrary} style={styles.input}>
                <Text>Selectionner une Image</Text>
              </TouchableOpacity>
              {formData.image && (
                <Image
                  source={formData.image}
                  style={{ width: 100, height: 100 }}
                />
              )}
              <View style={{ flexDirection: "row", gap: 15 }}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[styles.button, styles.buttonClose]}
                >
                  <Text style={[styles.textStyle, {}]}>Ajouter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.buttonClose,
                    { backgroundColor: "red" },
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={[styles.textStyle]}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Ajouter un nouveau don </Text> 
          <Ionicons
              size={25}
              name={'add' }
              color={'white'}
            />
        </TouchableOpacity>
      </View>
     <SafeAreaView style={{ flex: 1 ,} }>
      
       <View  style={{ flex: 1 ,}}>
  
     
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <NFTCard
                data={item}
                nom={item.nom}
                auteur={item.auteur}
                image={{uri:item.image}}
                prix={item.prix}
               handle={() =>deleteUser(item._id)}
              />
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
  

   
      </View>
    </SafeAreaView>
    </>
   
  );
};
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",

    flex: 1,
    alignItems: "center",
    marginTop: 2,
  },
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  modalView: {
    margin: 25,
    backgroundColor: "white",
    borderRadius: 20,
    width: 350,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 150,
  },
  buttonOpen: {
    backgroundColor: "#0099ff",
    width: 380,
    padding:15,
    justifyContent: "center",
flexDirection:'row',

    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:18
    
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
  input: {
    borderWidth: 1,

    borderColor: "rgba(49, 39, 131,1)",
    height: 45,
    width: 315,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 8,
  },
});
export default Homels;
