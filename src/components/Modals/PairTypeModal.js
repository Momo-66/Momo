import { Modal, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState, useEffect } from 'react';

import PretendardedText from '../CustomComponent/PretendardedText';

import AddRoutine from '../../assets/images/modals/addRoutine.svg';
import DeleteRoutine from '../../assets/images/modals/deleteRoutine.svg';
import EditRoutine from '../../assets/images/action_img.svg';

export const PairTypeModal = (props) => {

  const renderKeyValues = (key, value) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
      <PretendardedText style={styles.keys}>{key}</PretendardedText>
      <PretendardedText style={styles.values}>{value}</PretendardedText>
    </View>
  );

  const addRoutineModal = {
    title: '다음 루틴을 추가할게요.',
    // TO-DO: 루틴 정보 어떻게 가져와서 value에 넣을 것인지 생각해 보기.
    // TO-DO: keys, values 리스트 따로 가지는 것보다 Object mapping으로 바꾸는 게 나을 듯
    // pairs: [
    //   { key: '루틴명', value: '요가' },
    //   { key: '소요시간', value: '10분' },
    //   { key: '실행요일', value: '월,화,수,목,금,토,일' },
    // ],
    hasCancel: true,
    leftButtonText: '취소',
    rightButtonText: '확인',
  };
  const deleteRoutineModal = {
    title: '이 루틴을 삭제할까요?',
    // TO-DO: 루틴 정보 어떻게 가져와서 value에 넣을 것인지 생각해 보기.
    // TO-DO: keys, values 리스트 따로 가지는 것보다 Object mapping으로 바꾸는 게 나을 듯
    // pairs: [
    //   { key: '루틴명', value: '요가' },
    //   { key: '소요시간', value: '10분' },
    //   { key: '실행요일', value: '월,화,수,목,금,토,일' },
    // ],
    hasCancel: true,
    leftButtonText: '취소',
    rightButtonText: '확인',
  };
  const editRoutineModal = {
    title: '다음과 같이 수정할게요.',
    // TO-DO: 루틴 정보 어떻게 가져와서 value에 넣을 것인지 생각해 보기.
    // TO-DO: keys, values 리스트 따로 가지는 것보다 Object mapping으로 바꾸는 게 나을 듯
    // pairs: [
    //   { key: '기상 시간', value: '오전 00:00' },
    //   { key: '마치는 시간', value: '오전 00:00' },
    //   { key: '총', value: '+N분' },
    // ],
    hasCancel: true,
    leftButtonText: '취소',
    rightButtonText: '확인',
  };

  const [currentModalState, setCurrentModalState] = useState({});
  const [modalPairs, setModalPairs] = useState([
    { key: '루틴명', value: '요가' },
    { key: '소요시간', value: '10분' },
    { key: '실행요일', value: '월,화,수,목,금,토,일' },
  ]);

  useEffect(() => {
    if (props.type === 'addRoutineModal') {
      setCurrentModalState(addRoutineModal);
    } else if (props.type === 'deleteRoutineModal') {
      setCurrentModalState(deleteRoutineModal);
    } else {
      setCurrentModalState(editRoutineModal);
    }
  }, []);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.visible}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <PretendardedText style={styles.title}>{currentModalState.title}</PretendardedText>
          {props.type === 'addRoutineModal' ? <AddRoutine style={styles.image} /> : (props.type === 'deleteRoutineModal' ? <DeleteRoutine style={styles.image}/> : <EditRoutine style={styles.image}/>)}
          <View>
            {modalPairs.map((pair) => {
              return renderKeyValues(pair.key, pair.value);
            })}
          </View>
          <View style={styles.buttons}>
            <Pressable
              style={[styles.button, customSytles(currentModalState.hasCancel).leftButton]}
              onPress={() => props.setVisible(false)}>
              <PretendardedText style={customSytles(currentModalState.hasCancel).buttonText}>{currentModalState.leftButtonText}</PretendardedText>
            </Pressable>
            <Pressable
              style={[styles.button, styles.rightButton]}
              onPress={() => props.setVisible(false)}>
              <PretendardedText style={styles.buttonText}>{currentModalState.rightButtonText}</PretendardedText>
            </Pressable>
          </View>
        </View>
      </View>
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
    fontWeight: 700,
    fontSize: 20,
    color: '#222222',
    marginTop: 30,
    // marginBottom: 10,
  },
  image: {
    marginTop: 10,
    marginBottom: -8,
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
    backgroundColor: '#3CE3AC',
  },
  rightButton: {
    borderBottomRightRadius: 8,
  },
  buttonText: {
    fontWeight: 700,
    fontSize: 14,
  },
  keys: {
    fontWeight: 400,
    fontSize: 14,
    color: '#808080',
    marginRight: 30,
  },
  values: {
    fontWeight: 700,
    fontSize: 14,
    color: '#4C4C4C',
    textAlign: 'right',
  },
});

const customSytles = (hasCancel) => StyleSheet.create({
  leftButton: {
    backgroundColor: !hasCancel ? '#CAF4E6' : '#EEEEEE',
    borderBottomLeftRadius: 8,
  },
  buttonText: {
    fontWeight: 700,
    fontSize: 14,
    color: !hasCancel ? '#595959' : '#FF6056',
  },
});
