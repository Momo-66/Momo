import { StyleSheet, View, Animated, Dimensions, Platform, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import * as Progress from 'react-native-progress';
import { PretendardedText } from '../CustomComponent/PretendardedText';
import { useSelector } from 'react-redux';

import Action from '../Action';
import { Point } from '../CustomComponent/Point';

//TO-DO: replace momo.png with sleeping momo gif
import Dust from '../../assets/character/1_dust.svg';
import CurrentPointFire from '../../assets/images/currentPointFire.svg';
import RemainingPointFire from '../../assets/images/remainingPointFire.svg';

export const ActiveMain = () => {
    const userState = useSelector(state => state.user);
    const userRoutineState = useSelector(state => state.userRoutineSlice);

    const [animatedPoint, setAnimatedPoint] = useState(0);

    const opacity = useRef(new Animated.Value(0)).current;
    const pointOpacity = useRef(new Animated.Value(0)).current;
    const pointY = useRef(new Animated.Value(100)).current;

    function mainFadeIn() {
        Animated.timing(opacity, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }

    function pointAnimation() {
        Animated.timing(pointOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        Animated.timing(pointY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        setTimeout(() => {
            Animated.timing(pointOpacity, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }, 1000);
        setTimeout(() => {
            Animated.timing(pointY, {
                toValue: 100,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }, 2000);
    }

    useEffect(() => {
        if (userState.momoActivated) {
            mainFadeIn();
        }
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: opacity }]}>
            <View style={styles.progressArea}>
                <Animated.View style={[{ opacity: pointOpacity }, { transform: [{ translateY: pointY }] }]}>
                    <Point amount={animatedPoint}/>
                </Animated.View>
                <View style={styles.momo}>
                    <Dust/>
                </View>
                <View style={styles.currentPointContainer}>
                    <PretendardedText style={styles.currentPoint}>{Math.floor(userState.currentPoint / userState.requiredPointToNextLevel * 100)}% </PretendardedText>
                    <CurrentPointFire />
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Progress.Bar
                        progress={userState.progress}
                        height={9}
                        width={Dimensions.get('window').width * 0.65}
                        borderWidth={0}
                        color={'#32CACA'}
                        style={{ backgroundColor: '#B3B3B3' }}/>
                </View>
                <View style={styles.remainingPointContainer}>
                    <PretendardedText style={styles.remainingPoint}>다음 단계까지 </PretendardedText>
                    <PretendardedText style={styles.remainingPoint}>{userState.remainingPoint} </PretendardedText>
                    <RemainingPointFire />
                </View>
            </View>
            <View style={styles.todayRoutineContainer}>
                <PretendardedText style={styles.todayRoutine}>오늘의 루틴</PretendardedText>
                <View style={styles.remainingTimeContainer}>
                    <PretendardedText style={styles.remainingTimeText}>마칠 시간까지 </PretendardedText>
                    <PretendardedText style={styles.remainingTime}>{userRoutineState.remainingTime}</PretendardedText>
                    <PretendardedText style={styles.remainingTimeText}>분</PretendardedText>
                </View>
            </View>
            <View style={styles.actionsList}>
                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                    {userRoutineState.userRoutineActionList.map((action) => (
                        <Action id={action.id} setAnimatedPoint={setAnimatedPoint} pointAnimation={pointAnimation}/>
                    ))}
                </ScrollView>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 6, marginLeft: 30, marginRight: 30 },
    progressArea: { flex: 1, marginRight: 39, marginLeft: 39, marginBottom: 29 },
    momo: { flex: this.momoActivated ? (Platform.OS === 'ios' ? 1 : 0.5) : (Platform.OS === 'ios' ? 4 : 3), justifyContent: 'center', alignItems: 'center' },
    currentPointContainer: { flexDirection: 'row', marginBottom: 3, alignItems: 'center' },
    currentPoint: { fontWeight: '700', fontSize: 14, color: '#3CE3AC', marginRight: 2 },
    remainingPointContainer: { flexDirection: 'row', marginTop: 3, alignItems: 'center', justifyContent: 'flex-end' },
    todayRoutineContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
    todayRoutine: { fontWeight: '600', fontSize: 16, color: '#4C4C4C' },
    remainingTimeContainer: { flexDirection: 'row', alignItems: 'center' },
    remainingTimeText: { fontSize: 14, color: '#808080', fontWeight: '500' },
    remainingTime: { fontSize: 14, color: '#3CE3AC', fontWeight: '600' },
    remainingPoint: { fontWeight: '400', fontSize: 12, color: '#B3B3B3' },
    actionsList: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
