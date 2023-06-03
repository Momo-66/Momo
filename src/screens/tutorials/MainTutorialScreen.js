import { useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import {View, Animated, Platform } from 'react-native';
import { BackgroundImgComponent } from '../../components/tutorials/BackgroundImgComponent';
import { TutorialHeader } from '../../components/tutorials/TutorialHeader';
import { InitTutorialScreen } from './InitTutorialScreen';
import { TimePickerScreen } from './TimePickerScreen';
import { ButtonBottom } from '../../components/Buttons/ButtonBottom';
import { Step } from '../../utils/tutorials/Step';
import { patchUser, patchNewUserRoutine } from '../../api/userApi';

import { useDispatch, useSelector } from 'react-redux';
import { 
    setStep,
} from '../../redux/reducerSlices/tutorialSlice';
import {
    setIsTutorialFinished,
} from '../../redux/reducerSlices/userSlice';

import { storeData } from '../../utils/AsyncStorageUtils';

export const MainTutorialScreen = () => {
    const statusBarHeight = getStatusBarHeight(true);

    const step = useSelector((state) => state.tutorial.step);
    const isStepScreen = useSelector((state) => state.tutorial.isStepScreen);
    const enableBottomBtn = useSelector((state) => state.tutorial.enableBottomBtn);
    const wakeUpTime = useSelector((state) => state.user.wakeUpTime);
    const completeTime = useSelector((state) => state.user.completeTime);
    const clickedRoutineList = useSelector((state) => state.routineSlice.clickedRoutineList);
    const isValidTime = useSelector((state) => state.tutorial.isValidTime);

    const dispatch = useDispatch();

    const opacityAnimation = useRef(new Animated.Value(0)).current;

    const [buttonContent, setbuttonContent] = useState("");

    const setDataFromStorage = async () => {
        storeData('IsTutorialFinished', '1');    
    };

    function setStepfun(value) {
        dispatch(setStep({
            step: value,
        }));
    }

    function setIsTutorialFinishedfun(value) {
        dispatch(setIsTutorialFinished({
            isTutorialFinished: value,
        }));
    }

    function updateTutorialUserInfo(){
        // 루틴 시작 시간 / 루틴 마치는 시간 추가
        const dataBody = {
            fields: {
                wake_up_time: {
                    timestampValue: wakeUpTime,
                },
                routine_complete_time: {
                    timestampValue: completeTime,
                },
            },
        };

        patchUser(dataBody, ['wake_up_time', 'routine_complete_time']);

        // 루틴 추가
        clickedRoutineList.forEach((item) => {
            const data = {
                fields:{
                    active_day: { integerValue: 127 },
                    category: { stringValue: item.category},
                    difficulty: { integerValue: item.difficulty },
                    duration: { integerValue: item.duration },
                    emoji: { stringValue: item.emoji },
                    finished: { booleanValue: false },
                    image_path: { stringValue: "" },
                    routine_id: { stringValue: item.id },
                    routine_name: { stringValue: item.name },
                    streak: { integerValue: 0 },
                }
            }

            patchNewUserRoutine(item.id, data);
        });
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
        else if(step === Step.END_TUTORIAL){
            setDataFromStorage();
            setIsTutorialFinishedfun(true);
            updateTutorialUserInfo();
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
            <View style={{flex:1, flexDirection:"column", justifyContent:"space-between", position:"relative", paddingTop: Platform.OS === 'ios' ? statusBarHeight : 0}}>
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
                        enableBottomBtn ? <ButtonBottom action={clickBottomButton} text={buttonContent} disabled={!isValidTime && step === Step.STEP_TWO} backgroundColor={!isValidTime && step === Step.STEP_TWO ? '#EEEEEE' : null}/> : null
                    }
                </View>
            </View>
        </View>
    );
}