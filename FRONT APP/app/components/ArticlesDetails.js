import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import 'react-native-gesture-handler';

const ArticlesDetails = props => {
  console.log(props.route.params);
  return (
    <View style={styles.container}>
      <Text>ArticlesDetails</Text>
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

export default ArticlesDetails;
