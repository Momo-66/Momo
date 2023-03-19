import React from 'react';
import { View, ImageBackground } from 'react-native';

import {useSelector} from 'react-redux';

const BackgroundImgComponent = () => {
  const useBackgroundImg = useSelector((state) => state.tutorial.useBackgroundImg);

  return (
    useBackgroundImg ? 
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

export default BackgroundImgComponent;