import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Home from '../../assets/icons/light/home.svg';
import HomeFocused from '../../assets/icons/light/homeFocused.svg';

export const HomeTab = (props) => {

  return (
    <View style={styles.container}>
      {props.focused ? <HomeFocused/> : <Home/>}
      <Text style={[styles.text, customStyles(props.focused).text]}>홈</Text>
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
