import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { Step } from '../../utils/tutorials/Step';
import { 
    setStep,
} from '../../redux/reducerSlices/tutorialSlice';

const BottomButtonComponent = props => {
    const dispatch = useDispatch();

    const enableBottomBtn = useSelector((state) => state.tutorial.enableBottomBtn);
    const step = useSelector((state) => state.tutorial.step);

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

        }
    }

    return (
        <TouchableOpacity disabled={!enableBottomBtn} style={{flex: 1, backgroundColor: "#3CE3AC", justifyContent:"center", opacity:enableBottomBtn ? 1 : 0}} onPress={clickBottomButton}>
            <Text style={{textAlign:"center", color:"black", fontSize:20, fontWeight: 700}}>다음</Text>
        </TouchableOpacity>
    )
}

export default BottomButtonComponent;