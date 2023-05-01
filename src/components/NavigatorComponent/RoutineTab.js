import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Routine from '../../assets/icons/light/routine.svg';
import RoutineFocused from '../../assets/icons/light/routineFocused.svg';

export const RoutineTab = (props) => {
  return (
    <View style={styles.container}>
      {props.focused ? <RoutineFocused/> : <Routine/>}
      <Text style={[styles.text, customStyles(props.focused).text]}>마이루틴</Text>
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
