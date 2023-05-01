import React, { useEffect, useState } from 'react';
import {View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';

import { TimePicker } from '../../components/tutorials/TimePicker';
import { StepContentsComponent } from '../../components/tutorials/StepContentsComponent';
import { PretendardedText } from '../../components/CustomComponent/PretendardedText';
import { RoutineAddListComponent } from '../../components/RoutineAddList/RoutineAddListComponent';

import { asPickerFormat } from '../../utils/tutorials/TutorialUtils';
import { BUTTON_HEIGHT, VIEW_WIDTH } from '../../utils/tutorials/Values';

import { Step } from '../../utils/tutorials/Step';

import GreenStarImage from '../../assets/images/GreenStar.png';

export const TimePickerScreen = () => {
  const textColor = useSelector((state) => state.tutorial.textColor);
  const stepBottomContentOpacity = useSelector((state) => state.tutorial.stepBottomContentOpacity);
  const step = useSelector((state) => state.tutorial.step);
  const [time, setTime] = useState(asPickerFormat());
  const [routineTime, setroutineTime] = useState(0);
  const [isValid, setisValid] = useState(true);
  const startTime = useSelector((state) => state.user.wakeUpTime);
  const finishTime = useSelector((state) => state.user.completeTime);

  useEffect(() => {
      var tempStartTime = new Date(startTime);
      var startMinutes = tempStartTime.getHours() * 60 + tempStartTime.getMinutes();
      var tempFinishTime = new Date(finishTime);
      var finishMinutes = tempFinishTime.getHours() * 60 + tempFinishTime.getMinutes();

      if(finishMinutes >= startMinutes){
        setisValid(true);
      }else{
        setisValid(false);
      }

      setroutineTime(finishMinutes - startMinutes);
  }, [startTime, finishTime]);

  return (
    <View style={{flex: 1, margin:15, justifyContent:'space-between', flexDirection:'column'}}>
      <View style={{height:70}}>
        <StepContentsComponent textColor={textColor}/>
      </View>
      <View style={{flex:1}}> 
        {
          step === Step.STEP_THREE ?
            <RoutineAddListComponent isTutorial={true}/>
          :
            <TimePicker
              value={time}
              onChange={setTime}
              buttonHeight={BUTTON_HEIGHT}
              visibleCount={5}
            />
        }
      </View>
      <View style={{height:130}}>
        {
          step === Step.STEP_TWO ?
          <View style={{height: 130, alignItems:'flex-end', justifyContent:'center', opacity:stepBottomContentOpacity}}>
            <PretendardedText style={{color:textColor, fontSize: 15, fontWeight: 500}}>나에게 주어진 총 루틴 시간은</PretendardedText>
            <PretendardedText style={{color:textColor, fontSize: 15, fontWeight: 500, textAlign:'right'}}>기상시간 기준</PretendardedText>
            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
              <PretendardedText style={{color:isValid ? "#3CE3AC" : "#FF6056", fontSize: 15, fontWeight: 900}}>{isValid ? "+" : ""}{routineTime}</PretendardedText>
              <PretendardedText style={{color:isValid ? "#3CE3AC" : "#FF6056", fontSize: 15, fontWeight: 900}}>분</PretendardedText>
              <PretendardedText style={{color:textColor, fontSize: 15, fontWeight: 500}}> 입니다.</PretendardedText>
            </View>
          </View>
          :
          <View style={{height:130, alignItems:'flex-end', justifyContent:'flex-start', opacity:stepBottomContentOpacity}}>
            <View style={{flexDirection:'row', alignItems:'baseline', justifyContent:'flex-end'}}>
              <PretendardedText style={{fontWeight: 700, fontSize: 30, color:"#3CE3AC"}}>N</PretendardedText>
              <PretendardedText style={{fontWeight: 500, fontSize: 16, color:"#FFFFFF"}}>/28</PretendardedText>
              <Image source={GreenStarImage}/>
            </View>
              <PretendardedText style={{fontWeight: 500, fontSize: 16, color:"#D9D9D9", textAlign:'right'}}>루틴을 마칠 시간까지</PretendardedText>
            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
              <PretendardedText style={{fontWeight: 500, fontSize: 16, color:"#3CE3AC"}}>NN분 더 </PretendardedText>
              <PretendardedText style={{fontWeight: 500, fontSize: 16, color:"#D9D9D9"}}>여유있어요.</PretendardedText>
            </View>
            <View style={{marginTop:5}}>
              <PretendardedText style={{fontWeight: 500, fontSize: 12, color:"#B3B3B3", textAlign:'right'}}>※ 루틴별 예상 소요시간은 나중에 수정할 수 있어요.</PretendardedText>
            </View>
          </View>
        }
      </View>
    </View>
  );
};