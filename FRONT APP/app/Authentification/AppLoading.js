//import libraries
import AnimatedLottieView from 'lottie-react-native';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const AppLoading = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <AnimatedLottieView source={require('../../assets/138196-sucess.json')} autoPlay loop/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex:1
    },
});

//make this component available to the app
export default AppLoading;
