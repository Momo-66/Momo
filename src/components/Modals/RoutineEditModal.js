import { StyleSheet, View, Pressable, Modal, SafeAreaView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../styles';
import { useState } from 'react';

import { closeRoutineEditModal, closeRoutineOptionModal } from '../../redux/reducerSlices/modalSlice';

import { PretendardedText } from '../CustomComponent/PretendardedText';
import { ButtonBottom } from '../Buttons/ButtonBottom';
import { patchIndividualUserRoutine } from '../../api/userApi';
import { fetchUserRoutine } from '../../redux/reducerSlices/userRoutineSlice';
import { changeClickedRoutineDuration } from '../../redux/reducerSlices/routineSlice';

import BackIcon from '../../assets/icons/light/backIcon.svg';

const WEIGHT_OF_ACTIVE_DAY = [64, 32, 16, 8, 4, 2, 1];
const DAYS_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'];

export const RoutineEditModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);

  const clickedRoutineId = modalState.selectedRoutineId;
  const clickedRoutineName = modalState.selectedRoutineName;
  const clickedRoutineDuration = modalState.selectedRoutineLimitTime;
  const clickedActiveDay = modalState.selectedRoutineActiveDay;
  const [newClickedActiveDay, setNewClickedActiveDay] = useState(modalState.selectedRoutineActiveDay);


  const onClose = () => {
    dispatch(closeRoutineEditModal());
    dispatch(closeRoutineOptionModal());
  }

  function calcActiveDayBinary2Octal() {
    let octal = 0;

    for (let i = 0; i < newClickedActiveDay.length; i++) {
      if (newClickedActiveDay[i]){
        octal += WEIGHT_OF_ACTIVE_DAY[i];
      }
    }

    return octal;
  }
  function routineDataJsonify() {
    
    const active_day = calcActiveDayBinary2Octal();

    const data = {
      fields:{
        active_day: { integerValue: active_day },
        duration: { integerValue: clickedRoutineDuration },
        routine_id: { stringValue: clickedRoutineId },
        routine_name: { stringValue: clickedRoutineName},
      }
    }
    return data
  }

  function handleTimeChange(duration) {
    dispatch(changeClickedRoutineDuration(duration));
  }

  function confirmAddRoutineOnPress() {
    const data = routineDataJsonify();
    patchIndividualUserRoutine(clickedRoutineId, data, ['active_day', 'duration', 'routine_id', 'routine_name']);

    dispatch(closeRoutineEditModal());
    dispatch(closeRoutineOptionModal());
    dispatch(fetchUserRoutine());
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
    let tmpClickedActiveDay = [...newClickedActiveDay];
    tmpClickedActiveDay[parseInt(dayIndex)] = !tmpClickedActiveDay[parseInt(dayIndex)];
    setNewClickedActiveDay(tmpClickedActiveDay);
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalState.routineEditModal}>
        <SafeAreaView style={styles.container}>
          <Pressable style={globalStyles.rowFlex}>
            <Pressable
              onPress={() => onClose()}
              style={styles.backButton}>
              <BackIcon />
            </Pressable>
            <View style={styles.header}>
              <PretendardedText style={styles.headerText}>루틴 추가하기</PretendardedText>
            </View>
          </Pressable>
          <View style={{flex: 1, marginHorizontal: 20}}>

            <View>
              <PretendardedText style={styles.textStyle}>
                루틴명
              </PretendardedText>
              <View>
                <TextInput
                  style={styles.inputStyle}
                  placeholderTextColor='#F2F2F2'
                  autoCapitalize='none'
                  editable={false}>
                    <PretendardedText style={{fontSize: 14, fontWeight: '700', fontFamily: ''}}>
                      {clickedRoutineName}
                    </PretendardedText> 
                </TextInput>
              </View>
            </View>

            <View>
              <PretendardedText style={styles.textStyle}>
                실행요일
              </PretendardedText>
              <View style={{alignItems: 'center', paddingTop: '4%'}}>
                <View style={{flexDirection: 'row'}}>
                {DAYS_OF_WEEK.map((day, index) => (
                  <Pressable key={index} onPress={() => toggleDay(index)}>
                    <View style={[getContainerStyles(newClickedActiveDay, index), {width: 43.87, height: 43.87, marginHorizontal: 3, alignItems: 'center', justifyContent: 'center'}]}>
                      <PretendardedText style={{fontSize: 25.59, fontWeight: '600', color: newClickedActiveDay[index] ? '#FFFFFF' : '#B3B3B3'}}>
                        {day}
                      </PretendardedText>
                    </View>
                  </Pressable>
                ))}
                </View>
              </View>
            </View>
            
            <View>
              <PretendardedText style={styles.textStyle}>
                소요시간
              </PretendardedText>
            </View>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                <TextInput
                  style={{width: 122.2, height: 78, borderRadius: 15, borderColor: '#EEEEEE', borderWidth: 2, textAlign: 'center'}}
                  onChangeText={handleTimeChange}
                  autoCapitalize='none'
                  keyboardType='numeric'>
                    <PretendardedText style={{fontSize: 40, fontWeight: '700'}}>{clickedRoutineDuration}</PretendardedText>
                  </TextInput>
                  <PretendardedText style={{fontSize: 30, fontWeight: '700', marginLeft: '3%'}}>
                    분
                  </PretendardedText>
              </View>
          </View>
          
        </SafeAreaView><ButtonBottom
            text="완료"
            action={confirmAddRoutineOnPress}
            style={globalStyles.oneFlex} />
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
    width: '100%',
    height: 53,
    borderWidth: 1.5,
    borderRadius: 12,
    fontSize: 14,
    borderColor: '#EEEEEE',
    marginBottom: 10,
    paddingLeft: 15,
    backgroundColor: '#EEEEEE',
  },
  textStyle: {
    fontWeight: '700',
    fontSize: 12,
    color: '#4C4C4C',
    paddingTop: '4.5%',
    paddingBottom: '4%'
  },
  userInputContainer: {
    marginLeft: '6%',
    paddingTop: '4%',
  }
});
