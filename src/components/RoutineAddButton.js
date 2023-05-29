import React from 'react';
import {StyleSheet, Image, View, Pressable} from 'react-native';
import { useDispatch } from 'react-redux';

import { openRoutineAddModal } from '../redux/reducerSlices/modalSlice';

// import AddButton from '../assets/images/add.png';
import AddButton from '../assets/images/add.svg';

const RoutineAddButton = () => {
  const dispatch = useDispatch();

  function handleModal(action) {
    dispatch(action());
  }

  return (
    <View style={styles.container} >
      <Pressable onPress={() => handleModal(openRoutineAddModal)}>
        <AddButton/>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 10,
    backgroundColor: 'gray',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default RoutineAddButton;
