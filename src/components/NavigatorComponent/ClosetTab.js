import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Closet from '../../assets/icons/light/closet.svg';
import ClosetFocused from '../../assets/icons/light/closetFocused.svg';

export const ClosetTab = (props) => {
  return (
    <View style={styles.container}>
      {props.focused ? <ClosetFocused/> : <Closet/>}
      <Text style={[styles.text, customStyles(props.focused).text]}>꾸미기</Text>
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
