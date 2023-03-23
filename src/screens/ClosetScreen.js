import {View, StyleSheet, Dimensions, Image} from 'react-native';
import React from 'react';

import Background from '../assets/images/closet_background.png'
import CommingSoonImage from '../assets/images/wip.svg';


const ClosetScreen = () => {
  var {height, width} = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <Image source={Background} style={{height: height, width: width, resizeMode: 'stretch'}}/>
      <CommingSoonImage style={styles.coomingsoonContainer}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  coomingsoonContainer:{
    position:'absolute'
  }
});

export default ClosetScreen;
