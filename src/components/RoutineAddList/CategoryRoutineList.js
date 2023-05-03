import { StyleSheet, View } from 'react-native';
import React from 'react';

import { Category } from '../CustomComponent/Category';
import { Routine } from './Routine';

export const CategoryRoutineList = (props) => {
  
  const renderRoutineList = routine => (
    <Routine
      isTutorial={routine.isTutorial}
      id={routine.id}
      name={routine.name}
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
