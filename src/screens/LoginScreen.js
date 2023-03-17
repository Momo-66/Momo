import React from 'react';
import {StyleSheet,Text,View,Image,SafeAreaView,TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';

import {login} from '../redux/reducerSlices/userSlice';
import LogoImage from '../assets/images/Logo.png';
import LoginButton from '../components/LoginButton';
import InputForm from '../components/InputForm';
import GoogleLoginButton from '../components/GoogleLoginButton';
import {signInAnonymously} from '../api/userAuthApi';

const LoginScreen = () => {

  const dispatch = useDispatch();

  const handleAnonymousLoginPress = async () => {
    await signInAnonymously(()=>{dispatch(login())});
  };

  return (
    <View style={styles.contianer}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
          <Image style={{marginTop: 50}} source={LogoImage} />
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
          <InputForm />
          <LoginButton />

          <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 14, fontWeight: '500', color: '#808080'}}>
                처음 오셨나요?
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={handleAnonymousLoginPress}>
                <Text
                  style={{fontSize: 14, fontWeight: '500', color: '#3CE3AC'}}>
                  익명으로 로그인
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{flex: 0.8, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 14, marginBottom: 20, color: '#222222'}}>
            간편로그인
          </Text>
          <GoogleLoginButton />
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
  input: {
    width: 329,
    height: 53,
    borderWidth: 1.5,
    borderRadius: 12,
    fontSize: 14,
    borderColor: '#EEEEEE',
    marginBottom: 10,
    paddingLeft: 15,
  },
});

export default LoginScreen;
