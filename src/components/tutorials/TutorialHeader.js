import { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Step } from '../../utils/tutorials/Step';
import {useSelector, useDispatch} from 'react-redux';
import { 
    setStep,
} from '../../redux/reducerSlices/tutorialSlice';

import RightBlackButtonImg from '../../assets/images/TutorialHeaderRightBlackButton.png';
import LeftBlackButtonImg from '../../assets/images/TutorialHeaderLeftBlackButton.png';
import RightWhiteButtonImg from '../../assets/images/TutorialHeaderRightWhiteButton.png';
import LeftWhiteButtonImg from '../../assets/images/TutorialHeaderLeftWhiteButton.png';

const TutorialHeader = (props) => {
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
            console.log("스텝1");
            setStepfun(Step.INIT_TUTORIAL);
        }
        else if(step === Step.STEP_TWO){
            console.log("스텝2");
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
        console.log("헤더창 로드");
    }, []);

    return (
    <View style={{flex: 1, margin:15, flexDirection:"row", justifyContent:"space-between"}}>
        <TouchableOpacity onPress={clickLeftButton} style={{opacity:enableHeaderLeftBtn ? 1 : 0}} disabled={!enableHeaderLeftBtn}>
            <Image source={enableBackgroundImg ? LeftWhiteButtonImg : LeftBlackButtonImg} />
        </TouchableOpacity>
        <TouchableOpacity onPress={clickRightButton} style={{opacity:enableHeaderRightBtn ? 1 : 0}} disabled={!enableHeaderRightBtn}>
            <Image source={enableBackgroundImg ? RightWhiteButtonImg : RightBlackButtonImg} />
        </TouchableOpacity>
    </View>
    )
}

export default TutorialHeader;