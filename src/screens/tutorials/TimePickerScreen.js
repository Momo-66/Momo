import React, { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

import TimePicker from '../../components/tutorials/TimePicker';

import { asPickerFormat } from '../../utils/tutorials/TutorialUtils';
import { BUTTON_HEIGHT, VIEW_WIDTH } from '../../utils/tutorials/Values';

const TimePickerScreen = () => {
  const textColor = useSelector((state) => state.tutorial.textColor);
    const [time, setTime] = useState(asPickerFormat(new Date()));

  return (
    <View style={{flex: 1, margin:15, justifyContent:'space-between', flexDirection:'column'}}>
        <View style={{height: 100, justifyContent:'center'}}>
            <Text style={{color:"#3CE3AC", fontSize: 17, fontWeight: 700}}>Step 1.</Text>
            <Text style={{color:textColor, fontSize: 17, fontWeight: 500}}>모든 루틴을 마칠 시간을</Text>
            <Text style={{color:textColor, fontSize: 17, fontWeight: 500}}>설정해주세요.</Text>
        </View>
      <TimePicker
        value={time}
        onChange={setTime}
        buttonHeight={BUTTON_HEIGHT}
        visibleCount={5}
      />
      <View style={{height: 100, alignItems:'flex-end', justifyContent:'center'}}>
            <Text style={{color:textColor, fontSize: 15, fontWeight: 500}}>나에게 주어진 총 루틴 시간은</Text>
            <Text style={{color:textColor, fontSize: 15, fontWeight: 500}}>기상시간 기준</Text>
            <View style={{flexDirection:'row'}}>
                <Text style={{color:"#3CE3AC", fontSize: 15, fontWeight: 900}}>+43분</Text>
                <Text style={{color:textColor, fontSize: 15, fontWeight: 500}}> 입니다.</Text>
            </View>
      </View>
    </View>
  );
};

export default TimePickerScreen;