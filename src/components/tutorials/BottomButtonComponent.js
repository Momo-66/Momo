import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { Step } from '../../utils/tutorials/Step';
import { 
    setStep,
} from '../../redux/reducerSlices/tutorialSlice';

export const BottomButtonComponent = props => {
    const dispatch = useDispatch();

    const enableBottomBtn = useSelector((state) => state.tutorial.enableBottomBtn);
    const step = useSelector((state) => state.tutorial.step);

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
        if(step === Step.END_TUTORIAL){
            setbuttonContent("모모 시작하기!");
        }
        else{
            setbuttonContent("다음");
        }
    }, [step]);

    return (
        <TouchableOpacity disabled={!enableBottomBtn} style={{flex: 1, backgroundColor: "#3CE3AC", justifyContent:"center", opacity:enableBottomBtn ? 1 : 0}} onPress={clickBottomButton}>
            <Text style={{textAlign:"center", color:"black", fontSize:20, fontWeight: 700}}>{buttonContent}</Text>
        </TouchableOpacity>
    )
}