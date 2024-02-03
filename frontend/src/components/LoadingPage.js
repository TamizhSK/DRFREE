import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CenteredObject = () => {
  return (
    <View style={styles.container}>
      {/* Your object/component goes here */}
      <Text style={styles.centeredText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CenteredObject;
