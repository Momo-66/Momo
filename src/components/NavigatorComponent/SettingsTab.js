import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Settings from '../../assets/icons/light/settings.svg';
import SettingsFocused from '../../assets/icons/light/settingsFocused.svg';

export const SettingsTab = (props) => {
  return (
    <View style={styles.container}>
      {props.focused ? <SettingsFocused/> : <Settings/>}
      <Text style={[styles.text, customStyles(props.focused).text]}>환경설정</Text>
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
