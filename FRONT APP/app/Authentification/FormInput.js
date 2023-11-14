import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const FormInput = props => {
  const { placeholder, label, error } = props;
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
       
        {error ? (
          <Text style={{ color: 'red', fontSize: 10 }}>{error}</Text>
        ) : null}
      </View>
    
      <TextInput {...props}  placeholderTextColor="#A8A8A8" placeholder={placeholder} style={styles.input} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'rgba(49, 39, 131,1)',
    height: 45,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 8,
    width:350
  },
});

export default FormInput;
