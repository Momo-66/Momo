import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import googleLoginButton from '../assets/images/google.svg';

const GoogleLoginButton = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => alert('Google Login')}>
        <googleLoginButton />
      </TouchableOpacity>
    </View>
  );
};

export default GoogleLoginButton;
