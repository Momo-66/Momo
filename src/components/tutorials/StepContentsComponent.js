import React from 'react';
import { View } from 'react-native';
import {useSelector} from 'react-redux';
import { PretendardedText } from '../../components/CustomComponent/PretendardedText';

export const StepContentsComponent = props => {
    const stepNumber = useSelector((state) => state.tutorial.stepNumber);
    const stepText = useSelector((state) => state.tutorial.stepText);
    const enableBackgroundImg = useSelector((state) => state.tutorial.enableBackgroundImg);

    return (
        <View style={{justifyContent:'flex-start'}}>
            <PretendardedText style={{color:"#3CE3AC", fontSize: 17, fontWeight: 700}}>Step {stepNumber}.</PretendardedText>
            <PretendardedText style={{color:enableBackgroundImg ? "white" : "black", fontSize: 17, fontWeight: 500}}>{stepText}</PretendardedText>
        </View>
    )
}
