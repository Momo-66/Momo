import { useEffect, useState, useRef } from 'react';
import {View, SafeAreaView, Animated} from 'react-native';
import BackgroundImgComponent from '../../components/tutorials/BackgroundImgComponent';
import TutorialHeader from '../../components/tutorials/TutorialHeader';
import InitTutorialScreen from './InitTutorialScreen';
import BottomButtonComponent from '../../components/tutorials/BottomButtonComponent';
import TimePickerScreen from './TimePickerScreen';

import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useBackgroundImg, setStep1 } from '../../redux/reducerSlices/tutorialSlice';

const MainTutorialScreen = () => {
    const step = useSelector((state) => state.tutorial.step);

    const dispatch = useDispatch();

    function UseBackgroundImgfun() {
		dispatch(useBackgroundImg());
	}

    function setStep1fun() {
        dispatch(setStep1());
    }

    const opacityAnimation = useRef(new Animated.Value(0)).current;

    const [bottomButtonOpacity, setbottomButtonOpacity] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            // UseBackgroundImgfun();
            setStep1fun();
            Animated.timing(opacityAnimation, {
                toValue: 1,
                useNativeDriver: true,
              }).start();
            console.log("Main Screen");
        }, 3000);
        setTimeout(() => {
            setbottomButtonOpacity(1);
        }, 6000);
    }, []);

    return(
        <View style={{flex:1}}>
            <BackgroundImgComponent />
            <SafeAreaView style={{flex:1, flexDirection:"column", justifyContent:"space-between", position:"relative"}}>
                <View style={{height: 50}}>
                    <TutorialHeader />
                </View>
                <View style={{flex: 1}}>
                    {
                        step == 0 ? <InitTutorialScreen/> : 
                        <Animated.View style={{opacity: opacityAnimation}}>
                            <TimePickerScreen/>
                        </Animated.View>
                    }
                </View>
                <View style={{height: 101}}>
                    <BottomButtonComponent opacity={bottomButtonOpacity}/>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default MainTutorialScreen;