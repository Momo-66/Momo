import React from 'react';
import {Modal, StyleSheet, View, Text, TouchableOpacity, Pressable} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { PretendardedText } from '../CustomComponent/PretendardedText';
import { closeRoutineOptionModal, openPairTypeModal, nextStepRoutineAddList, openRoutineAddListModal, openRoutineEditModal } from '../../redux/reducerSlices/modalSlice';
import { PairTypeModal } from './PairTypeModal';
import { RoutineEditModal } from './RoutineEditModal';

const RoutineOptionModal = () => {
  const dispatch = useDispatch();
  const isModalVisible = useSelector(state => state.modal.routineOptionModal);
  const posX = useSelector(state => state.modal.routineOptionModalPositionX);
  const posY = useSelector(state => state.modal.routineOptionModalPositionY);

  const onColse = () => {
    dispatch(closeRoutineOptionModal());
  }

  const openDeleteRoutineModal = () => {
    dispatch(openPairTypeModal());
  }

  const openRoutineInfoEditModal = () => {
    dispatch(openRoutineEditModal());
  }

  return (
    <Modal transparent={true} visible={isModalVisible}>
      <Pressable style={{flex: 1}} onPressOut={onColse}>
        <View style={[styles.modalView, {top: posY + 20, left: posX - 70}]}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity style={[styles.button, styles.editButton]} onPress={openRoutineInfoEditModal}>
                <PretendardedText style={{color: '#4C4C4C', fontWeight: '600', fontSize: 14,}}>편집하기</PretendardedText>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={openDeleteRoutineModal}>
                <PretendardedText style={{color: '#FF6056', fontWeight: '600', fontSize: 14}}>삭제하기</PretendardedText>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
      <View>
        <PairTypeModal type='deleteRoutineModal'/>
        <RoutineEditModal/>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: 93,
    height: 72,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset:{
      width: 0,
      height: 3,
    }

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 88,
    height: 32,
    marginTop: 3,
  },
  editButton: {
    backgroundColor: 'white',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 88,
    height: 30,
    marginTop: 3,
  },
});

export default RoutineOptionModal;
