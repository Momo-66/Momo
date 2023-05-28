import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, Pressable, SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../styles';

import { closeTimePickerModal } from '../../redux/reducerSlices/modalSlice';
import { setIsWakeUpStep } from '../../redux/reducerSlices/userSlice';
import { PretendardedText } from '../CustomComponent/PretendardedText';
import { TimePicker } from '../tutorials/TimePicker';
import { ButtonBottom } from '../Buttons/ButtonBottom';

import BackIcon from '../../assets/icons/light/backIcon.svg';
import { asPickerFormat } from '../../utils/tutorials/TutorialUtils';
import { getFromUtcDateState } from '../../utils/TimeStateUtils';
import { BUTTON_HEIGHT, VIEW_WIDTH } from '../../utils/tutorials/Values';

export const RoutineTimePickerModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);
  const isWakeUpStep = useSelector(state => state.user.isWakeUpStep);
  const startTime = useSelector((state) => state.user.wakeUpTime);
  const finishTime = useSelector((state) => state.user.completeTime);
  const [time, setTime] = useState(asPickerFormat());
  const [buttonText, setbuttonText] = useState("");
  const [stepNum, setstepNum] = useState("");
  const [stepContent, setstepContent] = useState("");
  const [routineTime, setroutineTime] = useState(0);
  const [isValid, setisValid] = useState(true);

  function handleModal(action) {
    dispatch(action());
  }

  function setIsWakeUpStepFun(value) {
    dispatch(setIsWakeUpStep({
      isWakeUpStep: value,
    }));
}

  function onClickButton() {
    if (isWakeUpStep) {
      setIsWakeUpStepFun(false);
    }
    else {
      setStepOne();
      handleModal(closeTimePickerModal);
    }
  }

  function setStepOne() {
    setbuttonText("다음");
    setstepNum("1");
    setstepContent("새로운 기상 시간을 설정해주세요.");
    setIsWakeUpStepFun(true);
  }

  function setStepTwo() {
    setbuttonText("저장");
    setstepNum("2");
    setstepContent("모든 루틴을 마칠 시간을\n설정해주세요.");
    setIsWakeUpStepFun(false);
  }

  useEffect(() => {
    if (modalState.routineTimePickerModal){
      if (isWakeUpStep) {
        setTime(getFromUtcDateState(startTime));
        setStepOne();
      }
      else {
        setTime(getFromUtcDateState(finishTime));
        setStepTwo();
      }
    }
  }, [isWakeUpStep, modalState.routineTimePickerModal]);

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
    <Modal
      animationType="fade"
      visible={modalState.routineTimePickerModal}
    >
      <SafeAreaView style={styles.container}>
        <Pressable style={globalStyles.rowFlex}>
          <Pressable
            onPress={() => isWakeUpStep ? handleModal(closeTimePickerModal) : setStepOne()}
            style={styles.backButton}>
            <BackIcon />
          </Pressable>
          <View style={styles.header}>
            <PretendardedText style={styles.headerText}>시간 수정하기</PretendardedText>
          </View>
        </Pressable>
        <View style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
          <View style={{height:70, justifyContent:'flex-start', marginTop: 40, marginLeft: 15, marginRight: 15}}>
            <PretendardedText style={{color:"#3CE3AC", fontSize: 17, fontWeight: 700}}>Step {stepNum}.</PretendardedText>
            <PretendardedText style={{color:"black", fontSize: 17, fontWeight: 500}}>{stepContent}</PretendardedText>
          </View>
          <View>
            <TimePicker
              value={time}
              onChange={setTime}
              buttonHeight={BUTTON_HEIGHT}
              visibleCount={5}
            />
          </View>
          <View style={{height:100, alignItems:'flex-end', justifyContent:'center', opacity: isWakeUpStep ? 0 : 1, marginRight: 15}}>
            <PretendardedText style={{color:'#808080', fontSize: 15, fontWeight: 500}}>나에게 주어진 총 루틴 시간은</PretendardedText>
            <PretendardedText style={{color:'#808080', fontSize: 15, fontWeight: 500, textAlign:'right'}}>기상시간 기준</PretendardedText>
            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
              <PretendardedText style={{color:isValid ? "#3CE3AC" : "#FF6056", fontSize: 15, fontWeight: 900}}>{isValid ? "+" : ""}{routineTime}</PretendardedText>
              <PretendardedText style={{color:isValid ? "#3CE3AC" : "#FF6056", fontSize: 15, fontWeight: 900}}>분</PretendardedText>
              <PretendardedText style={{color:'#808080', fontSize: 15, fontWeight: 500}}> 입니다.</PretendardedText>
            </View>
          </View>
          <View style={{height: 101}}>
            <ButtonBottom action={onClickButton} text={buttonText}/>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 6.9 },
  backButton: {
    paddingRight: '4%',
    paddingLeft: '6%',
    paddingTop: 15,
    paddingBottom: 15,
  },
  header: {
    width: '76%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 700,
    fontSize: 16,
    color: '#222222',
  },
});