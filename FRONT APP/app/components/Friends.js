import { DrawerActions } from "@react-navigation/core";
import React from "react";
import { View, StyleSheet, Text, Button, Pressable } from "react-native";
import "react-native-gesture-handler";



const Friends = (props) => {
  return (
    
    <View style={styles.container}>
    <Text>Friends</Text>
    <Pressable
      onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())
      }
      style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
    >
      <Text>Open Drawer</Text>
    </Pressable>
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Friends;
