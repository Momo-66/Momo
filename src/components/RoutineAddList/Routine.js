import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PretendardedText } from '../CustomComponent/PretendardedText';
import { toggleClick, addRoutine, removeRoutine } from '../../redux/reducerSlices/routineSlice';

import Difficulty from '../../assets/images/difficultyStar.svg';

export const Routine = (props) => {
  const dispatch = useDispatch();
  const clickedRoutineId = useSelector((state) => state.routineSlice.clickedRoutineId);
  const clickedRoutineList = useSelector((state) => state.routineSlice.clickedRoutineList);

  const toggleButton = () => {
    const {id, category, name, emoji, duration, difficulty} = props;
    const routineIdx = clickedRoutineList.findIndex(routine => routine.id === id);
    if (props.isTutorial === true) {
      if (routineIdx !== -1) {
        dispatch(removeRoutine(id))
      } else {
        dispatch(addRoutine({id, category, name, emoji, duration, difficulty}))
      }
    } else {
      dispatch(toggleClick({id, category, name, emoji, duration, difficulty}));
    }
  }

  const changeClickedRoutineBackgroundColor = () => {
    if (props.isTutorial === true){
      return clickedRoutineList.some(routine => routine.id === props.id) ? '#3CE3AC' : 'transparent';
    } else {
      return clickedRoutineId === props.id ? '#3CE3AC' : 'transparent'; 
    }
  }

  const changeClickedRoutineColor = () => {
    if (props.isTutorial){
      return clickedRoutineList.some(routine => routine.id === props.id) ? '#222222' : 'white';
    } else {
      return '#222222'; 
    }
  }

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleButton}>
          <View style={[styles.button, {backgroundColor: changeClickedRoutineBackgroundColor()}]}>
            <PretendardedText style={{fontWeight: '500', fontSize: 14, color: changeClickedRoutineColor()}}>{props.emoji}  {props.name} (+{props.duration}분) </PretendardedText>
              <View style={{ justifyContent: 'center' }}>
                <Difficulty />
              </View>
            <PretendardedText style={styles.levelText}> {props.difficulty}</PretendardedText>
          </View>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: '2%',
    height: 25,
    alignItems: 'center',
    marginBottom: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height:25,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
    color:'#222222',
  },
  levelText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#FFEA2D',
  },
});
const tutorialStyle = StyleSheet.create({
  text: {
    fontWeight: '500',
    fontSize: 14,
    color:'white',
  },
});
