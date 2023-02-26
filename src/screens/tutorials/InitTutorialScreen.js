import React, { useEffect, useState } from 'react';
import {View} from 'react-native';
import TextContent from '../../components/tutorials/TextContent';

const InitTutorialScreen = () => {
  const [tutorialContent, settutorialContent] = useState("");
  const [tutorialTextColor, settutorialTextColor] = useState("black");

  useEffect(() => {
    setTimeout(() => {
      settutorialContent("아무것도 존재하지 않았던\n무(無)에서");
      console.log("First Step");
    }, 1500);
    setTimeout(() => {
      settutorialContent("세로운 세상이\n펑! 하고 나타났어요!");
      settutorialTextColor("white");
      console.log("Second Step");
    }, 3000);
    setTimeout(() => {
      settutorialContent("세로운 세상이\n펑! 하고 나타났어요!\n\n마치 아침 습관을 바꾸기로\n마음먹은 우리의 시작처럼 말이죠!");
      console.log("Third Step");
    }, 4500);
  }, []);

  return (
    <View style={{flex: 1, position:"relative"}}>
      <TextContent content={tutorialContent} textColor={tutorialTextColor}/>
    </View>
  );
};

export default InitTutorialScreen;