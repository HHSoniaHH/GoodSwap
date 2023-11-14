import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import 'react-native-gesture-handler';
import AjouterUnArticle from './Posts/AjouterUnArticle';

const Discussion = () => {
  return (
    <View style={styles.container}>
      <AjouterUnArticle/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Discussion;
