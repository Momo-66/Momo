import { StyleSheet, View, Pressable, Modal, SafeAreaView, ScrollView, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../styles';

import { closeRoutineAddListModal } from '../../redux/reducerSlices/modalSlice';

import PretendardedText from '../CustomComponent/PretendardedText';
import { CategoryRoutineList } from './CategoryRoutineList';
import { ButtonBottom } from '../Buttons/ButtonBottom';

import BackIcon from '../../assets/icons/light/backIcon.svg';
import BackIconWhite from '../../assets/icons/dark/backIcon.svg';
import darkBackground from '../../assets/images/darkBackground.png';

export const RoutineAddListModal = (props) => {
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);

  function handleModal(action) {
    dispatch(action());
  }

  // could this be in a slice?
  const routineCollection = {
    'documents': [
      {
        'name': 'projects/momo-89849/databases/(default)/documents/routine_collection/r1',
        'fields': {
          'category': {
            'stringValue': '건강',
          },
          'duration': {
            'integerValue': '5',
          },
          'image_url': {
            'stringValue': 'leaf',
          },
          'routine_name': {
            'stringValue': '기지개',
          },
          'difficulty': {
            'integerValue': '1',
          },
        },
        'createTime': '2023-03-21T14:16:25.460169Z',
        'updateTime': '2023-03-21T14:16:25.460169Z',
      },
      {
        'name': 'projects/momo-89849/databases/(default)/documents/routine_collection/r2',
        'fields': {
          'routine_name': {
            'stringValue': '스트레칭',
          },
          'category': {
            'stringValue': '성장',
          },
          'duration': {
            'integerValue': '5',
          },
          'image_url': {
            'stringValue': 'band',
          },
          'difficulty': {
            'integerValue': '1',
          },
        },
        'createTime': '2023-03-21T14:18:39.549800Z',
        'updateTime': '2023-03-21T14:18:39.549800Z',
      },
      {
        'name': 'projects/momo-89849/databases/(default)/documents/routine_collection/r3',
        'fields': {
          'difficulty': {
            'integerValue': '2',
          },
          'image_url': {
            'stringValue': 'scale',
          },
          'duration': {
            'integerValue': '5',
          },
          'category': {
            'stringValue': '생활',
          },
          'routine_name': {
            'stringValue': '체중재기',
          },
        },
        'createTime': '2023-03-21T14:20:03.999249Z',
        'updateTime': '2023-03-21T14:20:03.999249Z',
      },
    ],
  };
  const [healthRoutines, sethealthRoutines] = useState([]);
  const [selfHelpRoutines, setSelfHelpRoutines] = useState([]);
  const [livingRoutines, setLivingRoutines] = useState([]);

  useEffect(() => {
    sethealthRoutines([]);
    setSelfHelpRoutines([]);
    setLivingRoutines([]);
    for (let i = 0; i < routineCollection.documents.length; i++) {
      const routine = routineCollection.documents[i];
      const category = routine.fields.category.stringValue;
      const name = routine.fields.routine_name.stringValue;
      const duration = routine.fields.duration.integerValue;
      const difficulty = routine.fields.difficulty.integerValue;
      if (category === '건강') {
        for (let j = 0; j < 5; j++) {
          sethealthRoutines(routines => [...routines, {
            'name': name,
            'duration': duration,
            'difficulty': difficulty,
          }]);
        }
      } else if (category === '성장') {
        for (let j = 0; j < 10; j++) {
          setSelfHelpRoutines(routines => [...routines, {
            'name': name,
            'duration': duration,
            'difficulty': difficulty,
          }]);
        }
      } else {
        for (let j = 0; j < 5; j++) {
          setLivingRoutines(routines => [...routines, {
            'name': name,
            'duration': duration,
            'difficulty': difficulty,
          }]);
        }
      }
    }
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalState.routineAddListModal}>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={props.isTutorial ? darkBackground : null}>
          <Pressable style={globalStyles.rowFlex}>
            <Pressable
              onPress={props.isTutorial ? () => alert('back') : () => handleModal(closeRoutineAddListModal)}
              style={styles.backButton}>
              {props.isTutorial ? <BackIconWhite /> : <BackIcon />}
            </Pressable>
            <View style={props.isTutorial ? tutorialStyle.header : styles.header}>
              <PretendardedText style={props.isTutorial ? tutorialStyle.headerText : styles.headerText}>{props.isTutorial ? '이전으로' : '루틴 추가하기'}</PretendardedText>
            </View>
          </Pressable>
          <ScrollView style={styles.scrollView}>
            {props.isTutorial ? <View /> : <PretendardedText style={styles.listTitle}>루틴 목록</PretendardedText>}
            <CategoryRoutineList category="건강" routines={healthRoutines} isTutorial={props.isTutorial} />
            <CategoryRoutineList category="성장" routines={selfHelpRoutines} isTutorial={props.isTutorial} />
            <CategoryRoutineList category="생활" routines={livingRoutines} isTutorial={props.isTutorial} />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
        <ButtonBottom
          text="추가하기"
          style={globalStyles.oneFlex} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 6.9 },
  backButton: {
    paddingRight: '4%',
    paddingLeft: '6%',
    paddingTop: 15,
    paddingBottom: 15,
  },
  header: {
    width: '76%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 700,
    fontSize: 16,
    color: '#222222',
  },
  scrollView: {
    marginLeft: '5%',
    marginTop: '2.5%',
  },
  listTitle: {
    fontWeight: 700,
    fontSize: 12,
    marginBottom: '4%',
    color: '#4C4C4C',
  },
});

const tutorialStyle = StyleSheet.create({
  header: {
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 600,
    fontSize: 14,
    color: 'white',
  },
});
