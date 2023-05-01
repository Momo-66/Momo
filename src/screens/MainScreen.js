import { StyleSheet, View, ImageBackground, SafeAreaView, Platform, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { globalStyles } from '../styles';

import { fetchUserRoutine } from '../redux/reducerSlices/userRoutineSlice';
import { fetchUserBasic } from '../redux/reducerSlices/userSlice';

import { PretendardedText } from '../components/CustomComponent/PretendardedText';
import { ActiveMain } from '../components/Mains/ActiveMain';
import { InactiveMain } from '../components/Mains/InactiveMain';
import Notification from '../components/Notification';

import BackgroundImg from '../assets/images/bg_main.png';

const MainScreen = () => {
    const dispatch = useDispatch();
    const userState = useSelector(state => state.user);
    const userRoutineState = useSelector(state => state.userRoutineSlice);

    useEffect(() => {
        dispatch(fetchUserBasic());
        dispatch(fetchUserRoutine());
    }, [dispatch]);

    if (userRoutineState.isLoading || userRoutineState.error) {
        <SafeAreaView>
            <Text>Loading</Text>
        </SafeAreaView>;
    }

    if (userRoutineState.userRoutineActionList) {
        return (
            <View style={styles.backgroundColor}>
                <SafeAreaView style={[globalStyles.container, styles.backgroundColor]}>
                    <ImageBackground source={BackgroundImg} resizeMode="contain" style={[styles.bgImg, styles.backgroundColor]}>
                        <View style={styles.mainHeader}>
                            <View style={styles.headerText}>
                                <View style={styles.textFirstRow}>
                                    <PretendardedText style={styles.firstRowBold}>{userState.streak}일</PretendardedText>
                                    <PretendardedText style={styles.firstRowNormal}> 연속으로{'\n'}</PretendardedText>
                                </View>
                                <PretendardedText style={styles.textSecondRow}>루틴 진행 중!</PretendardedText>
                            </View>
                            <Notification />
                        </View>
                        {userState.momoActivated ? <ActiveMain /> : <InactiveMain />}
                    </ImageBackground>
                </SafeAreaView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    backgroundColor: { backgroundColor: '#F9F9F9' },
    bgImg: { flex: 1, justifyContent: 'center' },
    mainHeader: { flex: 1, flexDirection: 'row', marginLeft: 30, marginRight: 30, marginTop: 15 },
    headerText: { flex: 1 },
    textFirstRow: { flex: 1, flexDirection: 'row' },
    textSecondRow: { flex: 1, fontSize: 24, alignItems: 'center', color: '#222222' },
    firstRowBold: { fontWeight: '800', fontSize: 30, textDecorationLine: 'underline', color: '#3CE3AC', alignItems: 'center' },
    firstRowNormal: { fontSize: 24, lineHeight: 42, color: '#222222' },
    momo: { flex: this.momoActivated ? (Platform.OS === 'ios' ? 1 : 0.5) : (Platform.OS === 'ios' ? 4 : 3), justifyContent: 'center', alignItems: 'center' },
});

export default MainScreen;
