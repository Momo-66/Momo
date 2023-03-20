import React, { useEffect, useRef, useState } from 'react';
import {View, Animated} from 'react-native';
import TextContent from '../../components/tutorials/TextContent';
import { Step } from '../../utils/tutorials/Step';

import {useSelector, useDispatch} from 'react-redux';

import { 
  setStep,
} from '../../redux/reducerSlices/tutorialSlice';

const InitTutorialScreen = () => {
  const textColor = useSelector((state) => state.tutorial.textColor);
  const step = useSelector((state) => state.tutorial.step);

  const animation = useRef(new Animated.Value(0)).current;
  const [tutorialContent, settutorialContent] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (step === Step.INIT_TUTORIAL){
      setTimeout(() => {
        settutorialContent("무(無)의 상태에서\n새로운 세상을 창조해보아요");
        Animated.timing(animation, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        console.log("First Step");
      }, 1500);
      setTimeout(() => {
        dispatch(setStep({
          step: Step.STEP_ONE,
        }));
      }, 3000);
    }
    else if (step === Step.MID_TUTORIAL){
      setTimeout(() => {
        settutorialContent("곧 새로운 세상이\n펑! 하고 나타났어요!");
        Animated.timing(animation, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        console.log("First Step");
      }, 1500);
      setTimeout(() => {
        dispatch(setStep({
          step: 4,
        }));
      }, 3000);
    }
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