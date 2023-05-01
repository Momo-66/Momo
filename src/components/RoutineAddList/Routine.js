import { StyleSheet, View } from 'react-native';
import React from 'react';

import { PretendardedText } from '../CustomComponent/PretendardedText';

import Difficulty from '../../assets/images/difficultyStar.svg';

export const Routine = (props) => {
  return (
    <View style={styles.container}>
      <PretendardedText style={props.isTutorial ? tutorialStyle.text : styles.text }>{props.name} (+{props.duration}분) </PretendardedText>
      <View style={{ justifyContent: 'center' }}>
        <Difficulty />
      </View>
      <PretendardedText style={styles.levelText}> {props.difficulty}</PretendardedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: '2%',
    height: 25,
    alignItems: 'center',
    marginBottom: 5,
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
    color:'#222222',
  },
  levelText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#FFEA2D',
  },
});
const tutorialStyle = StyleSheet.create({
  text: {
    fontWeight: '500',
    fontSize: 14,
    color:'white',
  },
});
