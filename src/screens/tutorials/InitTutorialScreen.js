import React, { useEffect, useRef, useState } from 'react';
import {View, Animated} from 'react-native';
import TextContent from '../../components/tutorials/TextContent';

import {useSelector} from 'react-redux';

const InitTutorialScreen = () => {
  const textColor = useSelector((state) => state.tutorial.textColor);
  const animation = useRef(new Animated.Value(0)).current;
  const [tutorialContent, settutorialContent] = useState("");

  useEffect(() => {
    setTimeout(() => {
      settutorialContent("무(無)의 상태에서\n새로운 세상을 창조해보아요");
      Animated.timing(animation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      console.log("First Step");
    }, 1500);
  }, []);

  return (
    <View style={{flex:1, justifyContent:'center'}}>
      <Animated.View style={{opacity: animation}}>
        <TextContent content={tutorialContent} textColor={textColor}/>
      </Animated.View>
    </View>
  );
};

export default InitTutorialScreen;