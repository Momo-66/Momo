import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

import { StepContentsComponent } from '../../components/tutorials/StepContentsComponent';
import { RoutineAddListComponent } from '../../components/RoutineAddList/RoutineAddListComponent';
import { RoutineTimePicker } from '../../components/RoutineTimePicker';
import { Step } from '../../utils/tutorials/Step';

export const TimePickerScreen = () => {
  const textColor = useSelector((state) => state.tutorial.textColor);
  const step = useSelector((state) => state.tutorial.step);

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
          <RoutineTimePicker/>
        }
      </View>
    </View>
  );
};