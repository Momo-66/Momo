import { useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Step } from '../../utils/tutorials/Step';
import {useSelector, useDispatch} from 'react-redux';
import { 
    setStep,
} from '../../redux/reducerSlices/tutorialSlice';

import { PretendardedText } from '../CustomComponent/PretendardedText';

import LightBackIcon from '../../assets/icons/light/backIcon.svg';
import DarkBackIcon from '../../assets/icons/dark/backIcon.svg';
import LightNextIcon from '../../assets/icons/light/nextIcon.svg';

export const TutorialHeader = (props) => {
    const dispatch = useDispatch();

    const enableBackgroundImg = useSelector((state) => state.tutorial.enableBackgroundImg);
    const step = useSelector((state) => state.tutorial.step);
    const enableHeaderRightBtn = useSelector((state) => state.tutorial.enableHeaderRightBtn);
    const enableHeaderLeftBtn = useSelector((state) => state.tutorial.enableHeaderLeftBtn);

    function setStepfun(value) {
        dispatch(setStep({
            step: value,
        }));
    }

    function clickRightButton() {
        if (step === Step.INIT_TUTORIAL){
            setStepfun(Step.STEP_ONE);
        }
        else if(step === Step.ANIMATION_TUTORIAL){
            setStepfun(Step.END_TUTORIAL);
        }
    }

    function clickLeftButton() {
        if (step === Step.STEP_ONE){
            setStepfun(Step.INIT_TUTORIAL);
        }
        else if(step === Step.STEP_TWO){
            setStepfun(Step.STEP_ONE);
        }
        else if(step === Step.STEP_THREE){
            setStepfun(Step.STEP_TWO);
        }
        else if(step === Step.ANIMATION_TUTORIAL){
            setStepfun(Step.STEP_THREE);
        }
        else if(step === Step.END_TUTORIAL){
            setStepfun(Step.STEP_THREE);
        }
    }

    useEffect(() => {
    }, []);

    return (
    <View style={{flex: 1, margin:15, flexDirection:"row", justifyContent:"space-between"}}>
        <TouchableOpacity onPress={clickLeftButton} style={{opacity:enableHeaderLeftBtn ? 1 : 0, flexDirection:"row", alignItems:'center'}} disabled={!enableHeaderLeftBtn}>
            {enableBackgroundImg ? <LightBackIcon /> : <DarkBackIcon/> }
            <PretendardedText style={{color:enableBackgroundImg ? 'white' : 'black', marginLeft:4, fontSize:14}}>이전으로</PretendardedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={clickRightButton} style={{opacity:enableHeaderRightBtn ? 1 : 0, flexDirection:"row", alignItems:'center'}} disabled={!enableHeaderRightBtn}>
            <PretendardedText style={{color:enableBackgroundImg ? 'white' : 'black', marginRight:4, fontSize:14}}>다음으로</PretendardedText>
            <LightNextIcon/>
        </TouchableOpacity>
    </View>
    )
}