import { StyleSheet, View } from 'react-native';
import React from 'react';

import { PretendardedText } from './PretendardedText';

export const ComingSoon = () => {
  return (
    <View style={styles.comingSoon}>
      <PretendardedText style={styles.comingSoonText}>COMING SOON</PretendardedText>
    </View>
  );
};

const styles = StyleSheet.create({
  comingSoon: {
    backgroundColor: '#D7E0FF',
    borderRadius: 4,
    height: 14,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    color: '#6184FF',
    fontWeight: '700',
    fontSize: 7,
  },
});
