import { useEffect, useRef } from 'react';
import {View, SafeAreaView, Animated} from 'react-native';
import BackgroundImgComponent from '../../components/tutorials/BackgroundImgComponent';
import TutorialHeader from '../../components/tutorials/TutorialHeader';
import InitTutorialScreen from './InitTutorialScreen';
import BottomButtonComponent from '../../components/tutorials/BottomButtonComponent';
import TimePickerScreen from './TimePickerScreen';
import { Step } from '../../utils/tutorials/Step';

import { useDispatch, useSelector } from 'react-redux';
import { 
    setEnableBottomBtn,
    setStep,
} from '../../redux/reducerSlices/tutorialSlice';

const MainTutorialScreen = () => {
    const step = useSelector((state) => state.tutorial.step);

    const dispatch = useDispatch();

    function setEnableBottomBtnfun(value) {
        dispatch(setEnableBottomBtn({
            enableBottomBtn: value,
        }));
    }

    function setStepfun(value) {
        dispatch(setStep({
            step: value,
        }));
    }

    const opacityAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if(step === Step.INIT_TUTORIAL){
            setStepfun(Step.INIT_TUTORIAL);
        }
        else if(step === Step.STEP_ONE){
            Animated.timing(opacityAnimation, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }
    }, [step]);

    return(
        <View style={{flex:1}}>
            <BackgroundImgComponent />
            <SafeAreaView style={{flex:1, flexDirection:"column", justifyContent:"space-between", position:"relative"}}>
                <View style={{height: 50}}>
                    <TutorialHeader/>
                </View>
                <View style={{flex: 1}}>
                    {
                        step === Step.INIT_TUTORIAL ? <InitTutorialScreen/> : 
                        <Animated.View style={{opacity: opacityAnimation}}>
                            <TimePickerScreen/>
                        </Animated.View>
                    }
                </View>
                <View style={{height: 101}}>
                    <BottomButtonComponent />
                </View>
            </SafeAreaView>
        </View>
    );
}

export default MainTutorialScreen;