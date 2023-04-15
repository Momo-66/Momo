import React, { useEffect, useState } from 'react';
import {View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';

import { TimePicker } from '../../components/tutorials/TimePicker';
import { StepContentsComponent } from '../../components/tutorials/StepContentsComponent';

import { asPickerFormat } from '../../utils/tutorials/TutorialUtils';
import { BUTTON_HEIGHT, VIEW_WIDTH } from '../../utils/tutorials/Values';

import { Step } from '../../utils/tutorials/Step';

import GreenStarImage from '../../assets/images/GreenStar.png';

export const TimePickerScreen = () => {
  const textColor = useSelector((state) => state.tutorial.textColor);
  const stepBottomContentOpacity = useSelector((state) => state.tutorial.stepBottomContentOpacity);
  const step = useSelector((state) => state.tutorial.step);
  const [time, setTime] = useState(asPickerFormat(new Date()));

  return (
    <View style={{flex: 1, margin:15, justifyContent:'space-between', flexDirection:'column'}}>
      <StepContentsComponent textColor={textColor}/>
      <TimePicker
        value={time}
        onChange={setTime}
        buttonHeight={BUTTON_HEIGHT}
        visibleCount={5}
      />
      <View style={{height: 100, alignItems:'flex-end', justifyContent:'center', opacity:stepBottomContentOpacity}}>
        {
          step === Step.STEP_TWO ?
          <View>
            <Text style={{color:textColor, fontSize: 15, fontWeight: 500}}>나에게 주어진 총 루틴 시간은</Text>
            <Text style={{color:textColor, fontSize: 15, fontWeight: 500}}>기상시간 기준</Text>
            <View style={{flexDirection:'row'}}>
                <Text style={{color:"#3CE3AC", fontSize: 15, fontWeight: 900}}>+43분</Text>
                <Text style={{color:textColor, fontSize: 15, fontWeight: 500}}> 입니다.</Text>
            </View>
          </View>
          :
          <View>
            <View style={{flexDirection:'row', alignItems:'baseline', justifyContent:'flex-end'}}>
              <Text style={{fontWeight: 700, fontSize: 30, color:"#3CE3AC"}}>N</Text>
              <Text style={{fontWeight: 500, fontSize: 16, color:"#FFFFFF"}}>/28</Text>
              <Image source={GreenStarImage}/>
            </View>
            <Text style={{fontWeight: 500, fontSize: 16, color:"#D9D9D9"}}>루틴을 마칠 시간까지</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontWeight: 500, fontSize: 16, color:"#3CE3AC"}}>NN분 더</Text>
              <Text style={{fontWeight: 500, fontSize: 16, color:"#D9D9D9"}}>여유있어요.</Text>
            </View>
          </View>
        }
      </View>
    </View>
  );
};