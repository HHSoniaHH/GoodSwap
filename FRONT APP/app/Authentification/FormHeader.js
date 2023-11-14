import React from "react";
import { View, StyleSheet, Text, Animated, Image } from "react-native";
import logo from "../../assets/logo.png";


const FormHeader = ({
  leftHeading,
  rightHeading,
  subHeading,
  leftHeaderTranslateX = 40,
  rightHeaderTranslateY = -20,
  rightHeaderOpacity = 0,
}) => {
 

  return (
    
    <>
      <View style={styles.container}>
        <Image source={logo} style={{ width: 220, height: 100 }}></Image>
      </View>
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.heading,
            { transform: [{ translateX: leftHeaderTranslateX }] },
          ]}
        >
          {leftHeading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity: rightHeaderOpacity,
              transform: [{ translateY: rightHeaderTranslateY }],
            },
          ]}
        >
          {rightHeading}
        </Animated.Text>
      </View>
      {/* <Text style={styles.subHeading}>{subHeading}</Text> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
    
   
  },
  heading: { fontSize: 26, fontWeight: "bold", color: "rgba(49, 39, 131,1)", fontFamily:'poppins' },
  subHeading: { fontSize: 18, color: "#1b1b33", textAlign: "center" ,fontFamily:'poppins' },
});

export default FormHeader;
