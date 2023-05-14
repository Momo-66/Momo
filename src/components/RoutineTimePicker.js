import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {useSelector} from 'react-redux';

import { TimePicker } from '../components/tutorials/TimePicker';
import { PretendardedText } from '../components/CustomComponent/PretendardedText';

import { BUTTON_HEIGHT, VIEW_WIDTH } from '../utils/tutorials/Values';
import { asPickerFormat } from '../utils/tutorials/TutorialUtils';

export const RoutineTimePicker = (props) => {
    const stepBottomContentOpacity = useSelector((state) => state.tutorial.stepBottomContentOpacity);
    const startTime = useSelector((state) => state.user.wakeUpTime);
    const finishTime = useSelector((state) => state.user.completeTime);
    const textColor = useSelector((state) => state.tutorial.textColor);
    const [time, setTime] = useState(asPickerFormat());
    const [routineTime, setroutineTime] = useState(0);
    const [isValid, setisValid] = useState(true);

    useEffect(() => {
        var tempStartTime = new Date(startTime);
        var tempFinishTime = new Date(finishTime);

        if(tempFinishTime >= tempStartTime){
          setisValid(true);
        }else{
          setisValid(false);
        }
  
        var diff = tempFinishTime - tempStartTime;
        var diffMin = diff / (1000 * 60);

        setroutineTime(diffMin);
    }, [startTime, finishTime]);

    return (
        <View style={{position:'relative', width:'100%', height:'100%'}}>
            <TimePicker
              value={time}
              onChange={setTime}
              buttonHeight={BUTTON_HEIGHT}
              visibleCount={5}
            />
            <View style={{height: 100, alignItems:'flex-end', justifyContent:'center', opacity:stepBottomContentOpacity, position:'absolute', right:0, bottom:0}}>
              <PretendardedText style={{color:textColor, fontSize: 15, fontWeight: 500}}>나에게 주어진 총 루틴 시간은</PretendardedText>
              <PretendardedText style={{color:textColor, fontSize: 15, fontWeight: 500, textAlign:'right'}}>기상시간 기준</PretendardedText>
              <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                <PretendardedText style={{color:isValid ? "#3CE3AC" : "#FF6056", fontSize: 15, fontWeight: 900}}>{isValid ? "+" : ""}{routineTime}</PretendardedText>
                <PretendardedText style={{color:isValid ? "#3CE3AC" : "#FF6056", fontSize: 15, fontWeight: 900}}>분</PretendardedText>
                <PretendardedText style={{color:textColor, fontSize: 15, fontWeight: 500}}> 입니다.</PretendardedText>
              </View>
            </View>
          </View>
    );
}