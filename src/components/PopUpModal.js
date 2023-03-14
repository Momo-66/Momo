import { StyleSheet, Text, View, Modal, Image, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';

import lateRoutine from '../assets/images/modals/lateRoutine.png';
import photoVer from '../assets/images/modals/photoVer.png'
import deleteRoutine from '../assets/images/modals/deleteRoutine.png';
import addRoutine from '../assets/images/modals/addRoutine.png';
import editRoutine from '../assets/images/action_img.png'

export const PopUpModal = (props) => {

  const renderKeyValues = (key, value) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
      <Text style={styles.keys}>{key}</Text>
      <Text style={styles.values}>{value}</Text>
    </View>
  );

  const [descriptionTypeModal, setLateRoutineModal] = {
    lateRoutineModal: {
      title: '잠깐만요!',
      image: lateRoutine,
      description1: '루틴을 마칠 시간보다',
      boldText: 'N분 더 ',
      description2: '늦게 끝나요.\n그래도 설정을 완료할까요?',
      leftButtonText: '다시할래요.',
      rightButtonText: '네, 완료할게요.',
      hasCancel: false,
    },
    photoModal: {
      title: '사진 인증!',
      image: photoVer,
      description1: '루틴을 완료한 순간을\n사진으로 찍어 인증하면',
      boldText: '열정 포인트',
      description2: '를 더 받을 수 있어요!',
      leftButtonText: '다시할래요.',
      rightButtonText: '네, 완료할게요.',
      hasCancel: false,
    },
  };

  const [pairTypeModal, setDeleteRoutineConfirm] = {
    deleteRoutineModal: {
      title: '이 루틴을 삭제할까요?',
      image: deleteRoutine,
      // TO-DO: 루틴 정보 어떻게 가져와서 value에 넣을 것인지 생각해 보기.
      // TO-DO: keys, values 리스트 따로 가지는 것보다 Object mapping으로 바꾸는 게 나을 듯
      pairs: [
        { key: '루틴명', value: '요가' },
        { key: '소요시간', value: '10분' },
        { key: '실행요일', value: '월,화,수,목,금,토,일' },
      ],
    },
    addRoutineModal: {
      title: '다음 루틴을 추가할게요.',
      image: addRoutine,
      // TO-DO: 루틴 정보 어떻게 가져와서 value에 넣을 것인지 생각해 보기.
      // TO-DO: keys, values 리스트 따로 가지는 것보다 Object mapping으로 바꾸는 게 나을 듯
      pairs: [
        { key: '루틴명', value: '요가' },
        { key: '소요시간', value: '10분' },
        { key: '실행요일', value: '월,화,수,목,금,토,일' },
      ],
    },
    editRoutineModal: {
      title: '다음과 같이 수정할게요.',
      image: editRoutine,
      // TO-DO: 루틴 정보 어떻게 가져와서 value에 넣을 것인지 생각해 보기.
      // TO-DO: keys, values 리스트 따로 가지는 것보다 Object mapping으로 바꾸는 게 나을 듯
      pairs: [
        { key: '기상 시간', value: '오전 00:00' },
        { key: '마치는 시간', value: '오전 00:00' },
        { key: '총', value: '+N분' },
      ],
    },
    hasCancel: true,
    leftButtonText: '취소',
    rightButtonText: '확인',
  };

  const [currentModalState, setCurrentModalState] = useState({});

  useEffect(() => {
    if (props.type === 'addRoutineModal') {
      setCurrentModalState(pairTypeModal.addRoutineModal);
    };
  }, []);
  

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.visible}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          {/* TO-DO: Text pretendard로 바꾸기 */}
          <Text style={styles.title}>{currentModalState.title}</Text>
          <Image source={currentModalState.image} style={{ marginTop: 10, marginBottom: -8 }}/>
          {props.type === 'description' ?
            <View style={{ flex: 1 }}>
              <Text style={styles.description}>
                {currentModalState.description1}
              </Text>
              <Text style={[styles.description, styles.boldText]}>
                {currentModalState.boldText}
                <Text style={styles.description}>{currentModalState.description2}</Text>
              </Text>
            </View> :
            <View>
              {currentModalState.pairs.map((pair) => {
                return renderKeyValues(pair.key, pair.value);
              })}
            </View>
          }
          <View style={styles.buttons}>
            <Pressable
              style={[styles.button, customSytles(currentModalState.hasCancel).leftButton]}
              onPress={() => props.setVisible(false)}>
              <Text style={customSytles(currentModalState.hasCancel).buttonText}>{currentModalState.leftButtonText}</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.rightButton]}
              onPress={() => props.setVisible(false)}>
              <Text style={styles.buttonText}>{currentModalState.rightButtonText}</Text>
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
  description: {
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 14,
    color: '#4C4C4C',
  },
  boldText: {
    fontWeight: 900,
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
