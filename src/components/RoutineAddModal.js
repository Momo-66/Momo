import { Pressable, StyleSheet, TouchableWithoutFeedback, View, Modal, Text } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeRoutineAddModal, openRoutineAddListModal } from '../redux/reducerSlices/modalSlice';

import PretendardedText from './CustomComponent/PretendardedText';

export const RoutineAddModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);

  function handleModal(action) {
    dispatch(action());
  }

  function handleModalCombo() {
    handleModal(closeRoutineAddModal);
    setTimeout(() => handleModal(openRoutineAddListModal), 500);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalState.routineAddModal}>
      <Pressable
        style={styles.container}
        onPressOut={() => handleModal(closeRoutineAddModal)}>
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View style={styles.titleView}>
              <PretendardedText style={styles.titleTextBold}>
                루틴 종류
                <PretendardedText style={styles.titleText}>를{'\n'}선택해 주세요</PretendardedText>
              </PretendardedText>
            </View>
            <View style={styles.routineOptions}>
              <Pressable style={styles.momoOption}>
                <View style={styles.optionView}>
                  <PretendardedText style={styles.momoOptionTitle}>모모 기존 루틴</PretendardedText>
                  <PretendardedText style={styles.optionDescription}>모모에서 추천하는 기존 프리셋 루틴{'\n'}소요시간 변경 가능</PretendardedText>
                </View>
              </Pressable>
              <Pressable style={styles.customOption}>
                <View style={styles.optionView}>
                  <View style={styles.customOptionTitleView}>
                    <PretendardedText style={styles.customOptionTitle}>나만의 루틴</PretendardedText>
                    <View style={styles.comingSoon}>
                      <PretendardedText style={styles.comingSoonText}>COMING SOON</PretendardedText>
                    </View>
                  </View>
                  <PretendardedText style={styles.optionDescription}>내가 만드는 나만의 루틴{'\n'}루틴 이름 ∙ 소요시간 변경 가능</PretendardedText>
                </View>
              </Pressable>
            </View>
            <Pressable
              style={styles.nextButton}
              onPress={handleModalCombo}>
              <PretendardedText style={styles.nextButtonText}>다음</PretendardedText>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    alignItems: 'center',
    height: 535,
    backgroundColor: '#F9F9F9',
    borderRadius: 40,
    borderColor: '#EEE',
    borderStyle: 'solid',
    borderWidth: 1.5,
  },
  titleView: {
    width: '85%',
    flex: 1,
  },
  titleTextBold: {
    fontWeight: 600,
    fontSize: 24,
    color: '#222222',
    marginTop: 25,
  },
  titleText: {
    fontWeight: 500,
    color: '#4C4C4C',
  },
  routineOptions: {
    flex: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  momoOption: {
    width: '85%',
    height: 108,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#3CE3AC',
    marginBottom: 14,
    shadowColor: '#3CE3AC',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    elevation: 9,
    backgroundColor: 'white',
  },
  optionView: {
    marginTop: 20,
    marginLeft: '6%',
  },
  momoOptionTitle: {
    color: '#222222',
    fontWeight: 700,
    fontSize: 20,
  },
  optionDescription: {
    color: '#B3B3B3',
    fontWeight: 500,
    fontSize: 12,
    marginTop: 8,
    lineHeight: 18,
  },
  customOption: {
    width: '85%',
    height: 108,
    borderRadius: 12,
    backgroundColor: '#EEEEEE',
  },
  customOptionTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customOptionTitle: {
    color: '#4C4C4C',
    fontWeight: 700,
    fontSize: 20,
    marginRight: 8,
  },
  comingSoon: {
    backgroundColor: '#D7E0FF',
    borderRadius: 4,
    height: 14,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    color: '#6184FF',
    fontWeight: 700,
    fontSize: 7,
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#3CE3AC',
    width: '100%',
    height: 87,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontWeight: 700,
    fontSize: 20,
  },
});
