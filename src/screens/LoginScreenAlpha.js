import React from 'react';
import {StyleSheet,Text,View,Image,SafeAreaView,TouchableOpacity,} from 'react-native';
import {useDispatch} from 'react-redux';

import {login} from '../redux/reducerSlices/userSlice';
import LogoImage from '../assets/images/Logo.png';
import {signInAnonymously} from '../api/userAuthApi';

import axios from 'axios';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handleAnonymousLoginPress = async () => {
    await signInAnonymously(async() => {
      dispatch(login());
    });
  };


  return (
    <View style={styles.contianer}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
          <Image style={{marginTop: 50}} source={LogoImage} />
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={handleAnonymousLoginPress}>
            <Text style={styles.text}>익명으로 로그인하기</Text>
          </TouchableOpacity>

          <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>

            </View>
          </View>
        </View>
        <View
          style={{flex: 0.8, alignItems: 'center', justifyContent: 'center'}}>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3CE3AC',
    width: 329,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  text: {
    fontSize: 14,
  },
});

export default LoginScreen;
