import {StyleSheet, View, Image, SafeAreaView} from 'react-native';
import React, { useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';

import LoadingImage from '../assets/images/Intro_animation.gif';
import {login,logout,setUUID} from '../redux/reducerSlices/userSlice';
import {getAuthToken} from '../utils/utils';


const LoadingScreen = () => {
  const dispatch = useDispatch();
  
  const checkAuthUser = async () => {
    getAuthToken((token) => {
      if(token) {
        dispatch(setUUID(token));
        dispatch(login());
      } else {
        dispatch(logout());
      }
    });

  };
  
  useEffect (() => {
    checkAuthUser()
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <SafeAreaView style={styles.loadingContainer}>
        <Image source={LoadingImage} />
      </SafeAreaView>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
