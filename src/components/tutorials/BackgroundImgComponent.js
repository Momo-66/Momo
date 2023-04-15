import React from 'react';
import { View, ImageBackground } from 'react-native';

import {useSelector} from 'react-redux';

export const BackgroundImgComponent = () => {
  const enableBackgroundImg = useSelector((state) => state.tutorial.enableBackgroundImg);

  return (
    enableBackgroundImg ? 
    <ImageBackground 
        style={{flex:1, position:"absolute", width:"100%", height:"100%"}}
        source={require("../../assets/images/TutorialBackground.png")}
    /> 
    :
    <View 
        style={{flex:1, backgroundColor:"white", position:"absolute", width:"100%", height:"100%"}}
    />
  )
}