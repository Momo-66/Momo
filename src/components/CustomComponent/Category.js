import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { PretendardedText } from './PretendardedText';

export const Category = (props) => {
  return (
    <View style={styles.container}>
      <PretendardedText style={customSytles(props.name).textColor}>{props.name}</PretendardedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 52,
    height: 32,
    borderRadius: 1000,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2.5%',
  },
});

const customSytles = (name) => StyleSheet.create({
  textColor: {
    fontWeight: '900',
    fontSize: 16,
    color: name === '건강' ? '#3CE3AC' : (name === '성장' ? '#FF6056' : '#6184FF'),
  },
});
