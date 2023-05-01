import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { PretendardedText } from './PretendardedText';

import Plus from '../../assets/icons/light/pointAdd.svg';
import Fire from '../../assets/icons/light/fireRed.svg';

export const Point = (props) => {
  return (
    <View style={styles.container}>
      <Plus/>
      <PretendardedText style={styles.point}>{props.amount}</PretendardedText>
      <Fire/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '70%',
    marginTop: '10%',
  },
  point: {
    fontSize: 21,
    fontWeight: '700',
    color: '#FF6056',
    marginRight: 3,
  },
});
