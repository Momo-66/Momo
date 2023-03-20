import React, { useEffect, useRef, useState } from 'react';
import {View, Animated, Text, Image} from 'react-native';
import TextContent from '../../components/tutorials/TextContent';

import { 
  setStep,
} from '../../redux/reducerSlices/tutorialSlice';

const InitTutorialScreen = () => {
  const textColor = useSelector((state) => state.tutorial.textColor);
  const step = useSelector((state) => state.tutorial.step);
  const isTutorialMomo = useSelector((state) => state.tutorial.isTutorialMomo);

  const animation = useRef(new Animated.Value(0)).current;
  const opacityMomoImage = useRef(new Animated.Value(0)).current;
  const translateYMomoImage = useRef(new Animated.Value(50)).current;
  const opacityTutorialContent = useRef(new Animated.Value(0)).current;
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
        settutorialContent("시간 설정을 완료해\n새로운 세상의 시간이 흐를 수 있게 되었고");
        Animated.timing(animation, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        console.log("First Step");
      }, 1500);
      setTimeout(() => {
        Animated.timing(animation, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }, 3000);
      setTimeout(() => {
        settutorialContent("곧 새로운 세상이\n펑! 하고 나타났어요!");
        Animated.timing(animation, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        dispatch(useBackgroundImg());
      }, 4500);
      setTimeout(() => {
        dispatch(setStep({
          step: Step.STEP_THREE,
        }));
      }, 6000);
    }
    else if(step === Step.ANIMATION_TUTORIAL){
      settutorialContent("스스로 빛나는 태양이 될 수 있는\n아주 작은 먼지 '모모'가 나타났어요.\n\n그럼 모모와 함께 스스로를 빛내볼까요?");
      setTimeout(() => {
        Animated.timing(opacityMomoImage, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      }, 1500);
      setTimeout(() => {
        Animated.timing(translateYMomoImage, {
          toValue: -50,
          duration: 1500,
          useNativeDriver: true,
        }).start();
      }, 3000);
      setTimeout(() => {
        dispatch(setStep({
          step: Step.END_TUTORIAL,
        }));
      }, 6000);
    }
    else if(step === Step.END_TUTORIAL){
      Animated.timing(opacityTutorialContent, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [step]);

  return (
    <View style={{flex:1, justifyContent:'center'}}>
      {
        isTutorialMomo ? 
        <View style={{justifyContent:"center", alignItems:"center"}}>
          <Animated.View style={{opacity: opacityMomoImage, transform: [{translateY: translateYMomoImage}], justifyContent:"center", alignItems:"center"}}>
            <Image source={TutorialMomoImage} style={{marginBottom:50}}/>
            <Animated.View style={{opacity: opacityTutorialContent}}>
              <Text style={{color:"white", textAlign:"center"}}>{tutorialContent}</Text>
            </Animated.View>
          </Animated.View>
        </View>
        :
        <Animated.View style={{opacity: animation}}>
          <TextContent content={tutorialContent} textColor={textColor}/>
        </Animated.View>
      }
    </View>
  );
};

export default InitTutorialScreen;