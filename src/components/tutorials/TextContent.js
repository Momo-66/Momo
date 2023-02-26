import React from 'react';
import { View, Text } from 'react-native';

const TextContent = props => {
  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Text style={{color:props.textColor, textAlign:"center", fontSize:14}}>{props.content}</Text>
    </View>
  )
}

export default TextContent;