import { StyleSheet, Modal, View, Pressable, Text } from 'react-native';
import React, { useState, useEffect } from 'react';

import PretendardedText from '../CustomComponent/PretendardedText';

import OverTime from '../../assets/images/modals/overTime.svg';
import PhotoVer from '../../assets/images/modals/photoVer.svg';

export const DescriptionTypeModal = (props) => {

  const overTimeModal = {
    title: '잠깐만요!',
    description1: '루틴을 마칠 시간보다',
    boldText: '분 더 ',
    description2: '늦게 끝나요.\n그래도 설정을 완료할까요?',
    leftButtonText: '다시할래요.',
    rightButtonText: '네, 완료할게요.',
    hasCancel: false,
  };
  const photoModal = {
    title: '사진 인증!',
    description1: '루틴을 완료한 순간을\n사진으로 찍어 인증하면',
    boldText: '열정 포인트',
    description2: '를 더 받을 수 있어요!',
    leftButtonText: '괜찮아요.',
    rightButtonText: '좋아요!',
    hasCancel: true,
  };

  const [currentModalState, setCurrentModalState] = useState({});
  const [delayedTime, setDelayedTime] = useState(10);

  useEffect(() => {
    if (props.type === 'overTimeModal') {
      setCurrentModalState(overTimeModal);
    } else {
      setCurrentModalState(photoModal);
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
          {props.type === 'overTimeModal' ? <OverTime style={styles.image} /> : <PhotoVer style={styles.image} />}
          <View>
            <Text style={styles.description}>{currentModalState.description1}</Text>
            <Text style={[styles.boldText, styles.description]}>
              {delayedTime + currentModalState.boldText}
              <Text style={styles.description}>{currentModalState.description2}</Text>
            </Text>
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
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 14,
    color: '#4C4C4C',
  },
  boldText: {
    textAlign: 'center',
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
