import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Button, Text, TouchableOpacity } from "react-native";

import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { SubInfo, EthPrice, NFTTitle } from "./SubInfo";
import { RectButton, CircleButton } from "./Button";
import client from "../api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogin } from "../context/LoginProvider";
import ConfirmationModal from "./confirmationModal";

const NFTCard = ({ data ,image,handle,prix,nom,auteur}) => {
  const navigation = useNavigation();
 
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    // Handle confirmation logic
    handle()
    setShowModal(false);
  };

  const handleCancel = () => {
    // Handle cancel logic
    setShowModal(false);
  };
  



  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 250,
        }}
      >
        
        <Image
          source={image}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
          }}
        />

        <CircleButton imgUrl={assets.heart} right={10} top={10} />
      </View>

      <SubInfo />

      <View style={{ width: "100%", padding: SIZES.font }}>
        <NFTTitle
          title={nom}
          subTitle={auteur}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
        />

        <View
          style={{
            marginTop: SIZES.font,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >

          <TouchableOpacity 
          onPress={() => setShowModal(true)}
          style={{backgroundColor:'red' ,borderRadius:18,width:120 ,justifyContent:'center',alignItems:'center',padding:12}}>
            <Text style={{ color:'white'}}>Supprimer</Text>
          </TouchableOpacity>

          <ConfirmationModal
        visible={showModal}
        message={`Vous voulez vraiment supprimer ${nom} ?`}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
 
          <RectButton
            minWidth={120}
            fontSize={SIZES.font}
            handlePress={() => navigation.navigate("Details", { data })}
          />
         
          <EthPrice price={prix} />
        </View>
      </View>
    </View>
  );
};

export default NFTCard;
