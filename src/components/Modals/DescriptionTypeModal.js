import { StyleSheet, Modal, View, Pressable, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { closeDescriptionTypeModal } from '../../redux/reducerSlices/modalSlice';

import { modalStyles } from '../../styles';

import { PretendardedText } from '../CustomComponent/PretendardedText';

import OverTime from '../../assets/images/modals/overTime.svg';
import PhotoVer from '../../assets/images/modals/photoVer.svg';
import StartRoutine from '../../assets/images/modals/startRoutine.svg';
import BreakRoutine from '../../assets/images/modals/breakRoutine.svg';

export const DescriptionTypeModal = (props) => {
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);
  const routineState = useSelector(state => state.userRoutineSlice);

  const overTimeModal = {
    title: '잠깐만요!',
    description1: '루틴을 마칠 시간보다',
    boldText: '분 더 ',
    description2: '늦게 끝나요.\n그래도 설정을 완료할까요?',
    leftButtonText: '다시할래요.',
    rightButtonText: '네, 완료할게요.',
    hasCancel: false,
  };
  const routineStartModal = {
    title: '루틴을 시작할까요?',
    description1: '오늘 하를 시작할\n준비가 되었다면',
    boldText: '모모를 깨워 루틴을 시작합시다!',
    description2: '',
    leftButtonText: '괜찮아요.',
    rightButtonText: '좋아요!',
    hasCancel: true,
  };
  const routineBreakModal = {
    title: '오늘의 루틴을 중단할까요?',
    description1: '오늘 완료해야 할',
    boldText: `${routineState.numberOfReaminingRoutines}개의 루틴과 ${routineState.pointSumOfReaminingRoutines}의 열정포인트`,
    description2: '를 \n포기하게 됩니다.',
    leftButtonText: '계속할게요',
    rightButtonText: '그만할래요',
    hasCancel: true,
  };

  const [currentModalState, setCurrentModalState] = useState({});
  const [delayedTime, setDelayedTime] = useState(10);

  function closeModal() {
    dispatch(closeDescriptionTypeModal());
  }

  function rightButtonActionFun() {
    setTimeout(() => {
      props.rightButtonAction();
      closeModal();
    }, 200);
  }

  useEffect(() => {
    if (props.type === 'overTimeModal') {
      setCurrentModalState(overTimeModal);
      setDelayedTime(props.delayTime);
    } else if (props.type === 'photoModal') {
      setCurrentModalState(photoModal);
    } else if (props.type === 'breakModal') {
      setCurrentModalState(routineBreakModal);
    } else {
      setCurrentModalState(routineStartModal);
    }
  }, []);

  useEffect(() => {
    if (props.type === 'overTimeModal') {
      setDelayedTime(props.delayTime);
    } 
  }, [props.delayTime]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalState.descriptionTypeModal}
    >
      <Pressable
        style={modalStyles.container}
        onPressOut={closeModal}>
        <TouchableWithoutFeedback>
          <View style={modalStyles.modalView}>
            <PretendardedText style={modalStyles.title}>{currentModalState.title}</PretendardedText>
            {props.type === 'overTimeModal' ? <OverTime style={styles.image} /> : (props.type === 'photoModal' ? <PhotoVer style={styles.image} /> : (props.type === 'breakModal' ? <BreakRoutine style={styles.image}/> : <StartRoutine style={styles.image}/>))}
            <View>
              <Text style={styles.description}>{currentModalState.description1}</Text>
              <Text style={[styles.boldText, styles.description]}>
                {props.type === 'overTimeModal' ?  delayedTime + currentModalState.boldText : currentModalState.boldText}
                {currentModalState.description2 !== null ? <Text style={styles.description}>{currentModalState.description2}</Text> : <Text/>}
              </Text>
            </View>
            <View style={modalStyles.buttons}>
              <Pressable
                style={[modalStyles.button, customSytles(currentModalState.hasCancel).leftButton]}
                onPress={closeModal}>
                <PretendardedText style={customSytles(currentModalState.hasCancel, props.type === 'breakModal').leftButtonText}>{currentModalState.leftButtonText}</PretendardedText>
              </Pressable>
              <Pressable
                style={[modalStyles.button, customSytles(currentModalState.hasCancel, props.type === 'breakModal').rightButton]}
                onPress={props.rightButtonAction ? rightButtonActionFun : closeModal}>
                <PretendardedText style={customSytles(currentModalState.hasCancel, props.type === 'breakModal').rightButtonText}>{currentModalState.rightButtonText}</PretendardedText>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 270,
    height: 357,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#EEE',
    borderStyle: 'solid',
    borderWidth: 1.5,
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    color: '#222222',
    marginTop: 30,
  },
  image: {
    marginTop: 10,
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
    color: '#4C4C4C',
  },
  boldText: {
    textAlign: 'center',
    fontWeight: '900',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    width: 134,
    height: 68,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 14,
  },
});

const customSytles = (hasCancel, isBreakModal) => StyleSheet.create({
  leftButton: {
    backgroundColor: !hasCancel ? '#CAF4E6' : '#EEEEEE',
    borderBottomLeftRadius: 8,
  },
  leftButtonText: {
    fontWeight: '700',
    fontSize: 14,
    color: !hasCancel ? '#595959' : (isBreakModal ? '#4C4C4C' : '#FF6056'),
  },
  rightButton: {
    borderBottomRightRadius: 8,
    backgroundColor: isBreakModal ? '#FF6056' : '#3CE3AC',
  },
  rightButtonText: {
    fontWeight: '700',
    fontSize: 14,
    color: isBreakModal ? '#FFFFFF' : '#222222',
  },
});
