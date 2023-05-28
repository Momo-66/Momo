import React from 'react';
import { View, StyleSheet } from 'react-native';

import { PretendardedText } from './PretendardedText';

export const customConfig = {
  momoToast: ({text1, props}) => (
    <View style={styles.container}>
      <PretendardedText style={styles.text}>{text1}</PretendardedText>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '90%',
    backgroundColor: 'black',
    opacity: 0.6,
    borderRadius: 12,
  },
  text: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
});
