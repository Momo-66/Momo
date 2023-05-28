import {StyleSheet, SafeAreaView, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CategoryRoutineList} from './CategoryRoutineList';
import {PretendardedText} from '../CustomComponent/PretendardedText';

import {getRoutine} from '../../api/routineApi';
import GreenStar from '../../assets/images/green_star.svg';

export const RoutineAddListComponent = props => {
  const [healthRoutines, setHealthRoutines] = useState([]);
  const [selfHelpRoutines, setSelfHelpRoutines] = useState([]);
  const [livingRoutines, setLivingRoutines] = useState([]);

  const fetchData = async () => {
    try {
      const routineCollection = await getRoutine();
      const healthRoutines = [];
      const selfHelpRoutines = [];
      const livingRoutines = [];

      for (const routine of routineCollection.documents) {
        const tmp_id = routine.name.match(/(r\w+)/g);
        const {category, routine_name, emoji, duration, difficulty} =
          routine.fields;
        const routineData = {
          id: tmp_id[tmp_id.length - 1],
          category: category.stringValue,
          name: routine_name.stringValue,
          duration: duration.integerValue,
          difficulty: difficulty.integerValue,
          emoji: emoji.stringValue,
        };

        switch (category.stringValue) {
          case '건강':
            healthRoutines.push(routineData);
            break;
          case '성장':
            selfHelpRoutines.push(routineData);
            break;
          default:
            livingRoutines.push(routineData);
            break;
        }
      }

      setHealthRoutines(prevRoutines => [...prevRoutines, ...healthRoutines]);
      setSelfHelpRoutines(prevRoutines => [
        ...prevRoutines,
        ...selfHelpRoutines,
      ]);
      setLivingRoutines(prevRoutines => [...prevRoutines, ...livingRoutines]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{position: 'relative'}}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {props.isTutorial ? (
          <View />
        ) : (
          <PretendardedText style={styles.listTitle}>
            루틴 목록
          </PretendardedText>
        )}
        <CategoryRoutineList category="건강" routines={healthRoutines} isTutorial={props.isTutorial}/>
        <CategoryRoutineList category="성장" routines={selfHelpRoutines} isTutorial={props.isTutorial}/>
        <CategoryRoutineList category="생활" routines={livingRoutines} isTutorial={props.isTutorial}/>
      </ScrollView>
      <View style={{ height: props.isTutorial ? 110 : 90, alignItems: 'flex-end', justifyContent: 'flex-start', position: 'absolute', right: 0, bottom: 0, width: '100%', }} pointerEvents="none">
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', }}>
          <GreenStar/>
          <PretendardedText style={{fontWeight: '700', fontSize: 30, color: '#3CE3AC'}}>
            N
          </PretendardedText>
          <PretendardedText style={{ fontWeight: '500', fontSize: 16, color: props.isTutorial ? '#FFFFFF' : '#22222', }}>
            /28{' '}
          </PretendardedText>
        </View>
        <PretendardedText style={{ fontWeight: '500', fontSize: 16, color: props.isTutorial ? '#D9D9D9' : '#4C4C4C', textAlign: 'right', }}>
          루틴을 마칠 시간까지
        </PretendardedText>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <PretendardedText style={{fontWeight: '500', fontSize: 16, color: '#3CE3AC'}}>
            NN분 더{' '}
          </PretendardedText>
          <PretendardedText style={{ fontWeight: '500', fontSize: 16, color: props.isTutorial ? '#D9D9D9' : '#4C4C4C', }}>
            여유있어요.
          </PretendardedText>
        </View>
        {props.isTutorial ? (
          <View style={{marginTop: 5}}>
            <PretendardedText
              style={{ fontWeight: '500', fontSize: 12, color: '#B3B3B3', textAlign: 'right', }}>
              ※ 루틴별 예상 소요시간은 나중에 수정할 수 있어요.
            </PretendardedText>
          </View>
        ) : (
          <></>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginLeft: 0,
    marginTop: 20,
  },
  listTitle: {
    fontWeight: '700',
    fontSize: 12,
    marginBottom: '4%',
    color: '#4C4C4C',
  },
});
