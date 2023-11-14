import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const FormSubmitButton = ({ title, submitting, onPress }) => {
  const backgroundColor = submitting
    ? 'rgba(49, 39, 131,0.4)'
    : 'rgba(49, 39, 131,1)';

  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : null}
      style={[styles.container, { backgroundColor,   
    }]}
    >
      <Text style={{ fontSize: 18, color: '#fff'    ,fontFamily:'poppins'
 }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width:350
  },
});

export default FormSubmitButton;
