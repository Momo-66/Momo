import { StyleSheet, Pressable } from 'react-native';
import React from 'react';

import { PretendardedText } from '../CustomComponent/PretendardedText';

export const ButtonBottom = (props) => {
  return (
    <Pressable
      disabled={props.disabled}
      style={[styles.nextButton, { backgroundColor: props.backgroundColor || '#3CE3AC' }]}
      onPress={props.action}>
      <PretendardedText style={styles.nextButtonText}>{props.text}</PretendardedText>
    </Pressable>
  );
};

ButtonBottom.defaultProps = {
  disabled: false,
};

const styles = StyleSheet.create({
  nextButton: {
    flex: 1,
    backgroundColor: '#3CE3AC',
    width: '100%',
    height: 87,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontWeight: '700',
    fontSize: 20,
    color: "#222222",
  },
});
