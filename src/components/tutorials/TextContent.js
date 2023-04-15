import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import PretendardedText from '../CustomComponent/PretendardedText';

export const TextContent = props => {
  const enableBackgroundImg = useSelector((state) => state.tutorial.enableBackgroundImg);

  return (
    <View style={{justifyContent:"center", alignItems:"center"}}>
      <PretendardedText style={{color:enableBackgroundImg ? "white" : "black", textAlign:"center", fontSize:14}}>{props.content}</PretendardedText>
    </View>
  )
}