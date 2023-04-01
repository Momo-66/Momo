import { StyleSheet, View, ImageBackground, SafeAreaView, Platform } from 'react-native';
import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { logout } from '../redux/reducerSlices/userSlice';
import { globalStyles } from '../styles';

import PretendardedText from '../components/CustomComponent/PretendardedText';

import ActiveMain from '../components/Mains/ActiveMain';
import InactiveMain from '../components/Mains/InactiveMain';
import Notification from '../components/Notification';

//TO-DO: replace pngs with svgs
import BackgroundImg from '../assets/images/bg_main.png';

const MainScreen = () => {
    // const dispatch = useDispatch();

    // function testLogout() {
    //     dispatch(logout());
    // }

    //TO-DO: stroe state in a slice
    const [daysInARow, setDaysInARow] = useState(0);
    const [momoActivated, setMomoActivated] = useState(false);

    return (
        <View>
            <SafeAreaView style={globalStyles.container}>
                <ImageBackground source={BackgroundImg} resizeMode="contain" style={styles.bgImg}>
                    <View style={styles.mainHeader}>
                        <View style={styles.headerText}>
                            <View style={styles.textFirstRow}>
                                <PretendardedText style={styles.firstRowBold}>{daysInARow}일</PretendardedText>
                                <PretendardedText style={styles.firstRowNormal}> 연속으로{'\n'}</PretendardedText>
                            </View>
                            <PretendardedText style={styles.textSecondRow}>루틴 진행 중!</PretendardedText>
                        </View>
                        <Notification/>
                    </View>
                    { momoActivated ? <ActiveMain momoActivated={momoActivated}/> : <InactiveMain setMomoActivated={setMomoActivated} momoActivated={momoActivated}/> }
                </ImageBackground>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { height: '100%' },
    bgImg: { flex: 1, justifyContent: 'center' },
    mainHeader: { flex: 1, flexDirection: 'row', marginLeft: 30, marginRight: 30, marginTop: 15 },
    headerText: { flex: 1 },
    textFirstRow: { flex: 1, flexDirection: 'row' },
    textSecondRow: { flex: 1, fontSize: 24, alignItems: 'center', color: '#222222' },
    firstRowBold: { fontWeight: 800, fontSize: 30, textDecorationLine: 'underline', color: '#3CE3AC', alignItems: 'center' },
    firstRowNormal: { fontSize: 24, lineHeight: 42, color: '#222222' },
    momo: { flex: this.momoActivated ? (Platform.OS === 'ios' ? 1 : 0.5) : (Platform.OS === 'ios' ? 4 : 3), justifyContent: 'center', alignItems: 'center' },
});

export default MainScreen;
