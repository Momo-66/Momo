import { StyleSheet, View, Pressable, Modal, SafeAreaView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../styles';
import { useState, useRef } from 'react';

import { closeRoutineAddListModal } from '../../redux/reducerSlices/modalSlice';

import { PretendardedText } from '../CustomComponent/PretendardedText';
import { ButtonBottom } from '../Buttons/ButtonBottom';
import { RoutineAddListComponent } from './RoutineAddListComponent';
import { resetToggle, toggleClick } from '../../redux/reducerSlices/routineSlice';
import { nextStepRoutineAddList } from '../../redux/reducerSlices/modalSlice';
import { backStepRoutineAddList } from '../../redux/reducerSlices/modalSlice';
import { toggleDayClick } from '../../redux/reducerSlices/routineSlice';

import BackIcon from '../../assets/icons/light/backIcon.svg';

const DAYS_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'];

export const RoutineAddListModal = (props) => {
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);
  const routineAddListStep = modalState.routineAddListStep;

  const routineState = useSelector(state => state.routineSlice);
  const clickedRoutineId = routineState.clickedRoutineId;
  const clickedRoutineName = routineState.clickedRoutineName;
  const clickedRoutineDuration = routineState.clickedRoutineDuration;
  const clickedActiveDay = routineState.clickedActiveDay;
  

  function handleModal(action) {
    if (routineAddListStep == 1) {
      dispatch(resetToggle());
      dispatch(closeRoutineAddListModal());
    } else if (routineAddListStep == 2) {
      dispatch(backStepRoutineAddList());
    } else {
      dispatch(resetToggle());
      console.warn("Routine Add List Modal State Error");
    }
  }

  function addButtonOnPress() {
    if (clickedRoutineId == null) {
      console.log(clickedRoutineId)
      console.warn('Should Select a Routine');
      alert('루틴을 선택해주세요.');
      return null;
    }
    dispatch(nextStepRoutineAddList());
  }

  function confirmAddRoutineOnPress() {
    // TODO: API 날리기
    dispatch(closeRoutineAddListModal());
    dispatch(backStepRoutineAddList());
    dispatch(resetToggle());
  }

  const getContainerStyles = (isActive, position) => {
    const borderRadius = {
      borderTopLeftRadius: position === 0 ? 7 : 0,
      borderBottomLeftRadius: position === 0 ? 7 : 0,
      borderTopRightRadius: position === 6 ? 7 : 0,
      borderBottomRightRadius: position === 6 ? 7 : 0,
    };
    const backgroundColor = isActive[position] ? '#3CE3AC' : '#EEEEEE';
    return {...styles.dayContainerStyle, ...borderRadius, backgroundColor};
  };

  const toggleDay = (dayIndex) => {
    dispatch(toggleDayClick(dayIndex))
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalState.routineAddListModal}>
      { routineAddListStep == 1 ?
        <><SafeAreaView style={styles.container}>
          <Pressable style={globalStyles.rowFlex}>
            <Pressable
              onPress={() => handleModal()}
              style={styles.backButton}>
              <BackIcon />
            </Pressable>
            <View style={styles.header}>
              <PretendardedText style={styles.headerText}>루틴 추가하기</PretendardedText>
            </View>
          </Pressable>
          <View style={{ marginLeft: 15, marginRight: 15, flex: 1 }}>
            <RoutineAddListComponent isTutorial={false} />
          </View>
        </SafeAreaView><ButtonBottom
            text="추가하기"
            action={addButtonOnPress}
            style={globalStyles.oneFlex} /></> :
        <><SafeAreaView style={styles.container}>
          <Pressable style={globalStyles.rowFlex}>
            <Pressable
              onPress={() => handleModal()}
              style={styles.backButton}>
              <BackIcon />
            </Pressable>
            <View style={styles.header}>
              <PretendardedText style={styles.headerText}>루틴 추가하기</PretendardedText>
            </View>
          </Pressable>
          <View>
            <View>
              <PretendardedText style={styles.textStyle}>
                루틴명
              </PretendardedText>
              <View style={styles.userInputContainer}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder={clickedRoutineName}
                  placeholderTextColor='#808080'
                  autoCapitalize='none'
                  editable={false}
                />
              </View>
            </View>
            <View>
              <PretendardedText style={styles.textStyle}>
                소요시간
              </PretendardedText>
            </View>
              <View style={{flexDirection: 'row', paddingTop: '4%', paddingLeft: '5%', alignItems: 'center'}}>
                <TextInput
                  style={{width: 122.2, height: 78, borderRadius: 15, borderColor: '#EEEEEE', borderWidth: 2, textAlign: 'center'}}
                  placeholderTextColor='#222222'
                  autoCapitalize='none'
                  editable={false}>
                    <PretendardedText style={{fontSize: 40, fontWeight: '700'}}>{clickedRoutineDuration}</PretendardedText>
                  </TextInput>
                  <PretendardedText style={{fontSize: 30, fontWeight: '700', marginLeft: '3%'}}>
                    분
                  </PretendardedText>
              </View>
            <View>
              <PretendardedText style={styles.textStyle}>
                실행요일
              </PretendardedText>
              <View style={{alignItems: 'center', paddingTop: '4%'}}>
                <View style={{flexDirection: 'row'}}>
                {DAYS_OF_WEEK.map((day, index) => (
                  <Pressable key={index} onPress={() => toggleDay(index)}>
                    <View style={[getContainerStyles(clickedActiveDay, index), {width: 43.87, height: 43.87, marginHorizontal: 3, alignItems: 'center', justifyContent: 'center'}]}>
                      <PretendardedText style={{fontSize: 25.59, fontWeight: '600', color: clickedActiveDay[index] ? '#FFFFFF' : '#B3B3B3'}}>
                        {day}
                      </PretendardedText>
                    </View>
                  </Pressable>
                ))}
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView><ButtonBottom
            text="완료"
            action={confirmAddRoutineOnPress}
            style={globalStyles.oneFlex} /></>
        }
    </Modal>
  );
};

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
  inputStyle: {
    width: 329,
    height: 53,
    borderWidth: 1.5,
    borderRadius: 12,
    fontSize: 14,
    borderColor: '#EEEEEE',
    marginBottom: 10,
    paddingLeft: 15,
  },
  textStyle: {
    fontWeight: '700',
    fontSize: 12,
    color: '#4C4C4C',
    paddingTop: '4.5%',
    marginLeft: '6%',
  },
});
