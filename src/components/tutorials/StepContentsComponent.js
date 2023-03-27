import React from 'react';
import { View, Text } from 'react-native';
import {useSelector} from 'react-redux';

const StepContentsComponent = props => {
    const stepNumber = useSelector((state) => state.tutorial.stepNumber);
    const stepText = useSelector((state) => state.tutorial.stepText);

    return (
        <View style={{height: 100, justifyContent:'center'}}>
            <Text style={{color:"#3CE3AC", fontSize: 17, fontWeight: 700}}>Step {stepNumber}.</Text>
            <Text style={{color:props.textColor, fontSize: 17, fontWeight: 500}}>{stepText}</Text>
        </View>
    )
}

export default StepContentsComponent;