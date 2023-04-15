import { useEffect, useRef, useState } from 'react';
import {View, SafeAreaView, Animated} from 'react-native';
import BackgroundImgComponent from '../../components/tutorials/BackgroundImgComponent';
import TutorialHeader from '../../components/tutorials/TutorialHeader';
import InitTutorialScreen from './InitTutorialScreen';
import { useEffect, useRef, useState } from 'react';
import {View, SafeAreaView, Animated} from 'react-native';
import { BackgroundImgComponent } from '../../components/tutorials/BackgroundImgComponent';
import { TutorialHeader } from '../../components/tutorials/TutorialHeader';
import { InitTutorialScreen } from './InitTutorialScreen';
import { TimePickerScreen } from './TimePickerScreen';
import { ButtonBottom } from '../../components/Buttons/ButtonBottom';
import { Step } from '../../utils/tutorials/Step';

import { useDispatch, useSelector } from 'react-redux';
import { 
    setStep,
} from '../../redux/reducerSlices/tutorialSlice';

import { useDispatch, useSelector } from 'react-redux';
import { 
    setStep,
} from '../../redux/reducerSlices/tutorialSlice';

export const MainTutorialScreen = () => {
    const step = useSelector((state) => state.tutorial.step);
    const isStepScreen = useSelector((state) => state.tutorial.isStepScreen);
    const enableBottomBtn = useSelector((state) => state.tutorial.enableBottomBtn);

    const dispatch = useDispatch();

    const opacityAnimation = useRef(new Animated.Value(0)).current;

    const [buttonContent, setbuttonContent] = useState("");

    function setStepfun(value) {
        dispatch(setStep({
            step: value,
        }));
    }

    function clickBottomButton() {
        if (step === Step.STEP_ONE){
            setStepfun(Step.STEP_TWO);
        }
        else if(step === Step.STEP_TWO){
            setStepfun(Step.MID_TUTORIAL);
        }
        else if(step === Step.STEP_THREE){
            setStepfun(Step.ANIMATION_TUTORIAL);
        }
    }

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
        
        if(step === Step.END_TUTORIAL){
            setbuttonContent("모모 시작하기!");
        }
        else{
            setbuttonContent("다음");
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
                        !isStepScreen ? <InitTutorialScreen/> : 
                        <Animated.View style={{opacity: opacityAnimation, flex:1}}>
                            <TimePickerScreen/>
                        </Animated.View>
                    }
                </View>
                <View style={{height: 101}}>
                    {
                        enableBottomBtn ? <ButtonBottom action={clickBottomButton} text={buttonContent}/> : null
                    }
                </View>
            </SafeAreaView>
        </View>
    );
}
const MainTutorialScreen = () => {
    const [isChangeBackground, setisChangeBackground] = useState(false);
    const [tutorialTextColor, settutorialTextColor] = useState("black");

    useEffect(() => {
        setTimeout(() => {
            setisChangeBackground(true);
            settutorialTextColor("white");
            console.log("Main Screen");
        }, 3000);
    }, []);

    return(
        <View style={{flex:1}}>
            <BackgroundImgComponent isChangeBackground={isChangeBackground}/>
            <SafeAreaView style={{flex:1}}>
                <TutorialHeader textColor={tutorialTextColor}/>
                <InitTutorialScreen/>
            </SafeAreaView>
        </View>
    );
}