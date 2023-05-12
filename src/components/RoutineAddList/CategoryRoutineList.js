import { StyleSheet, View } from 'react-native';
import React from 'react';

import { Category } from '../CustomComponent/Category';
import { Routine } from './Routine';

export const CategoryRoutineList = (props) => {
  
  const renderRoutineList = routine => (
    <Routine
      isTutorial={props.isTutorial}
      id={routine.id}
      category={routine.category}
      name={routine.name}
      emoji={routine.emoji}
      duration={routine.duration}
      difficulty={routine.difficulty}/>
  );

  return (
    <View style={{ marginBottom: '8%' }}>
      <Category name={props.category} />
      <View>
        {props.routines.map(routine => renderRoutineList(routine))}
      </View>
    </View>
  );
};
