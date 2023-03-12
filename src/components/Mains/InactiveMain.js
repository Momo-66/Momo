import { StyleSheet, View, Image, Platform, Pressable, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import PretendardedText from '../CustomComponent/PretendardedText';

//TO-DO: replace momo.png with sleeping momo gif
import sleepingMomo from '../../assets/character/momo.png';

const InactiveMain = (props) => {
    const opacity = useRef(new Animated.Value(1)).current;
    useEffect(() => {
    }, []);

    function activateMomo() {
        if (!props.momoActivated) {
            Animated.timing(opacity, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }
        setTimeout(() => {
            props.setMomoActivated(true);
        }, 200);
    }

    return (
        <View style={{ flex: 6 }}>
            <View style={styles.momo}>
                <Image source={sleepingMomo} />
            </View>
            <Animated.View style={{opacity: opacity}}>
                <PretendardedText style={styles.todayRoutine}>오늘의 루틴</PretendardedText>
                <Pressable
                    style={[styles.activateBtn, styles.activateBtnShadow]}
                    onPress={activateMomo}>
                    <LinearGradient
                        colors={['#3CE3AC', '#32CACA']}
                        style={[styles.linearGradient, styles.activateBtnShadow]}>
                        <PretendardedText style={styles.activateText}>모모를 깨워 루틴 시작하기</PretendardedText>
                    </LinearGradient>
                </Pressable>
            </Animated.View>
        </View>
    );
};

export default InactiveMain;

const styles = StyleSheet.create({
    activateBtn: { alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
    activateBtnShadow: { shadowColor: '#3CE3AC', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, elevation: 9, backgroundColor: 'none' },
    linearGradient: { alignItems: 'center', justifyContent: 'center', borderRadius: 12, height: 90, width: '90%' },
    activateText: { fontWeight: 700, fontSize: 16, color: 'white' },
    todayRoutine: { fontWeight: 600, fontSize: 16, marginLeft: 30, marginBottom: 14 },
    momo: { flex: this.momoActivated ? (Platform.OS === 'ios' ? 1 : 0.5) : (Platform.OS === 'ios' ? 4 : 3), justifyContent: 'center', alignItems: 'center' },
});
