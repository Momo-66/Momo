import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PretendardedText } from '../CustomComponent/PretendardedText';
import { toggleClick } from '../../redux/reducerSlices/routineSlice';

import Difficulty from '../../assets/images/difficultyStar.svg';

export const Routine = (props) => {
  const dispatch = useDispatch();
  const clickedRoutineId = useSelector((state) => state.routineSlice.clickedRoutineId);

  const toggleButton = () => {
    const {id, name, emoji, duration, difficulty} = props
    dispatch(toggleClick({id, name, emoji, duration, difficulty}));
  }

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleButton}>
          <View style={[styles.button, {backgroundColor: clickedRoutineId === props.id ? '#3CE3AC' : 'white'}]}>
            <PretendardedText style={props.isTutorial ? tutorialStyle.text : styles.text }>{props.emoji}  {props.name} (+{props.duration}분) </PretendardedText>
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
    // backgroundColor: '#3CE3AC',
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
