import { Modal, StyleSheet, View, Pressable, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect } from 'react';

import { modalStyles } from "../../styles";

import { PretendardedText } from '../CustomComponent/PretendardedText';

import AddRoutine from '../../assets/images/modals/addRoutine.svg';
import DeleteRoutine from '../../assets/images/modals/deleteRoutine.svg';
import EditRoutine from '../../assets/images/modals/editRoutine.svg';

export const PairTypeModal = (props) => {

  const renderKeyValues = (key, value) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
      <PretendardedText style={styles.keys}>{key}</PretendardedText>
      <PretendardedText style={styles.values}>{value}</PretendardedText>
    </View>
  );

  const addRoutineModal = {
    title: '다음 루틴을 추가할게요.',
    hasCancel: true,
  };
  const deleteRoutineModal = {
    title: '이 루틴을 삭제할까요?',
    hasCancel: true,
  };
  const editRoutineModal = {
    title: '다음과 같이 수정할게요.',
    hasCancel: true,
  };

  const [currentModalState, setCurrentModalState] = useState({});
  // TO-DO: 선택된 루틴 정보로 set 되어야 함
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
      animationType="fade"
      transparent={true}
      visible={props.visible}
    >
      <Pressable
        style={modalStyles.container}
        onPressOut={() => props.setVisible(false)}>
        <TouchableWithoutFeedback>
          <View style={modalStyles.modalView}>
            <PretendardedText style={modalStyles.title}>{currentModalState.title}</PretendardedText>
            {props.type === 'addRoutineModal' ? <AddRoutine style={styles.image} /> : (props.type === 'deleteRoutineModal' ? <DeleteRoutine style={styles.image} /> : <EditRoutine style={styles.image} />)}
            <View>
              {modalPairs.map((pair) => {
                return renderKeyValues(pair.key, pair.value);
              })}
            </View>
            <View style={modalStyles.buttons}>
              <Pressable
                style={[modalStyles.button, customSytles(currentModalState.hasCancel).leftButton]}
                onPress={() => props.setVisible(false)}>
                <PretendardedText style={customSytles(currentModalState.hasCancel).buttonText}>취소</PretendardedText>
              </Pressable>
              <Pressable
                style={[modalStyles.button, modalStyles.rightButton]}
                onPress={() => props.setVisible(false)}>
                <PretendardedText style={modalStyles.buttonText}>확인</PretendardedText>
              </Pressable>
            </View>
          </View>
          </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    marginBottom: -8,
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
