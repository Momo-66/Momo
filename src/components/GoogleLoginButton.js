import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

const GoogleLoginButton = () => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => alert('Google Login')}
      >
        <Image
          source={require('../assets/images/Google.png')}
        />
      </TouchableOpacity>
    </View>
  )
}

export default GoogleLoginButton;