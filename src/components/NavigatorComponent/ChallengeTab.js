import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Challenge from '../../assets/icons/light/challenge.svg';
import ChallengeFocused from '../../assets/icons/light/challengeFocused.svg';

export const ChallengeTab = (props) => {
  return (
    <View style={styles.container}>
      {props.focused ? <ChallengeFocused/> : <Challenge/>}
      <Text style={[styles.text, customStyles(props.focused).text]}>챌린지</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    marginTop: 5,
  },
});

const customStyles = (focused) => StyleSheet.create({
  text: {
    fontWeight: focused ? '700' : '500',
    color: focused ? '#3CE3AC' : '#B3B3B3',
  },
});
