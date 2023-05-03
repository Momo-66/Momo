import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CategoryRoutineList } from './CategoryRoutineList';
import { PretendardedText } from '../CustomComponent/PretendardedText';

import { getRoutine } from '../../api/routineApi';

export const RoutineAddListComponent = (props) => {
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
                const { category, routine_name, duration, difficulty } = routine.fields;
                const routineData = { name: routine_name.stringValue, duration: duration.integerValue, difficulty: difficulty.integerValue };
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
            setSelfHelpRoutines(prevRoutines => [...prevRoutines, ...selfHelpRoutines]);
            setLivingRoutines(prevRoutines => [...prevRoutines, ...livingRoutines]);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <SafeAreaView style={{position:'relative'}}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {props.isTutorial ? <View /> : <PretendardedText style={styles.listTitle}>루틴 목록</PretendardedText>}
                <CategoryRoutineList category="건강" routines={healthRoutines} isTutorial={props.isTutorial} />
                <CategoryRoutineList category="성장" routines={selfHelpRoutines} isTutorial={props.isTutorial} />
                <CategoryRoutineList category="생활" routines={livingRoutines} isTutorial={props.isTutorial} />
           </ScrollView>
           <View style={{height:110, alignItems:'flex-end', justifyContent:'flex-start', position:'absolute', right:0, bottom:0, width:'100%'}} pointerEvents="none">
                <View style={{flexDirection:'row', alignItems:'baseline', justifyContent:'flex-end'}}>
                    <PretendardedText style={{fontWeight: '700', fontSize: 30, color:"#3CE3AC"}}>N</PretendardedText>
                    <PretendardedText style={{fontWeight: '500', fontSize: 16, color:"#FFFFFF"}}>/28</PretendardedText>
                </View>
                <PretendardedText style={{fontWeight: '500', fontSize: 16, color:"#D9D9D9", textAlign:'right'}}>루틴을 마칠 시간까지</PretendardedText>
                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                    <PretendardedText style={{fontWeight: '500', fontSize: 16, color:"#3CE3AC"}}>NN분 더 </PretendardedText>
                    <PretendardedText style={{fontWeight: '500', fontSize: 16, color:"#D9D9D9"}}>여유있어요.</PretendardedText>
                </View>
                <View style={{marginTop:5}}>
                    <PretendardedText style={{fontWeight: '500', fontSize: 12, color:"#B3B3B3", textAlign:'right'}}>※ 루틴별 예상 소요시간은 나중에 수정할 수 있어요.</PretendardedText>
                </View>
            </View>
        </SafeAreaView>
    );
}

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