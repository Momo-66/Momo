import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CategoryRoutineList } from './CategoryRoutineList';
import PretendardedText from '../CustomComponent/PretendardedText';

export const RoutineAddListComponent = (props) => {
    
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

    return(
        <SafeAreaView>
            <ScrollView style={styles.scrollView}>
                {props.isTutorial ? <View /> : <PretendardedText style={styles.listTitle}>루틴 목록</PretendardedText>}
                <CategoryRoutineList category="건강" routines={healthRoutines} isTutorial={props.isTutorial} />
                <CategoryRoutineList category="성장" routines={selfHelpRoutines} isTutorial={props.isTutorial} />
                <CategoryRoutineList category="생활" routines={livingRoutines} isTutorial={props.isTutorial} />
           </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        marginLeft: 0,
        marginTop: 20,
    },
    listTitle: {
        fontWeight: 700,
        fontSize: 12,
        marginBottom: '4%',
        color: '#4C4C4C',
    },
});