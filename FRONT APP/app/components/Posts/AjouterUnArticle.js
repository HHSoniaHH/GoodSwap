//import liraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import client from "../../api/client";
import { Modal } from "react-native";
import { Pressable } from "react-native";
import { Alert } from "react-native";

// create a component
const AjouterUnArticle = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    prix: "",
    desc: "",
    image: null,
    catigorie: "",
    type: "don",
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
    const { nom, prix, desc, catigorie, type, image } = formData;
    const token = await AsyncStorage.getItem("token");

    // Create form data object to send to server
    const data = new FormData();
    data.append("nom", nom);
    data.append("prix", prix);
    data.append("desc", desc);
    data.append("catigorie", catigorie);
    data.append("type", type);
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
      })
      .catch((error) => {
        console.log("Error adding product:", error);
      });
  };
  return (
    

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
                <Pressable
                  onPress={handleSubmit}
                  style={[styles.button, styles.buttonClose]}
                >
                  <Text style={[styles.textStyle, {}]}>Ajouter</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    { backgroundColor: "red" },
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={[styles.textStyle]}>Annuler</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Ajouter un nouveau don</Text>
        </Pressable>
      </View>
    
  );
};

// define your styles

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",

 
    alignItems: "center",
    marginTop: 2,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 2,
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
    width: 250,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
//make this component available to the app
export default AjouterUnArticle;
