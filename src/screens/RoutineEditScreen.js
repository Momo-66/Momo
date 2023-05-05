import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import { useSelector } from 'react-redux';

import { ActionBox } from '../components/ActionBox';
import RoutineAddButton from '../components/RoutineAddButton';
import TotalRoutineBox from '../components/TotalRoutineBox';
import { PretendardedText } from '../components/CustomComponent/PretendardedText';

import { RoutineAddModal } from '../components/RoutineAddModal';
import { RoutineAddListModal } from '../components/RoutineAddList/RoutineAddListModal';
import { RoutineTimePickerModal } from '../components/Modals/RoutineTimePickerModal';

const RoutineScreen = () => {

  const userRoutineState = useSelector(state => state.userRoutineSlice);
  const actionList = userRoutineState.userRoutineActionList;

  const renderActionList = (action) => (
    <ActionBox
      key={action.id}
      id={action.id}
      name={action.name}
      emoji={action.emoji}
      complete={action.complete}
      limit_time={action.duration}
      active_day={action.activeDay}
    />
  );
  return (
    <View style={styles.contianer}>
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#F9F9F9', width: '100%'}}>
        <View style={styles.headerContainer}>
          <PretendardedText style={{fontSize: 16, fontWeight: '700'}}>마이 루틴</PretendardedText>
        </View>

        <TotalRoutineBox/>

        <View style={styles.routineListContainer}>
          <ScrollView width="100%" showsVerticalScrollIndicator={false}>
            {actionList.map(action => renderActionList(action))}
          </ScrollView>
          <RoutineAddButton/>
          <RoutineAddModal/>
          <RoutineAddListModal isTutorial={false}/>
          <RoutineTimePickerModal/>
        </View>  
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 0.1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  routineListContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    marginHorizontal: 20,
  },
});

export default RoutineScreen;
