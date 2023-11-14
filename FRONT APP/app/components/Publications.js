import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import 'react-native-gesture-handler';

const Publications = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{marginBottom:15}}>Mes Publications</Text>
      <Button 
        onPress={() =>
          navigation.navigate('AnotherScreen', {
            someThing: 'This is for testing',
          })
        }
        title='Plus de details'
      />
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

export default Publications;
