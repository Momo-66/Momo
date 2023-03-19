import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {useSelector} from 'react-redux';

const BottomButtonComponent = props => {
    const enableBottomBtn = useSelector((state) => state.tutorial.enableBottomBtn);

    return (
        <TouchableOpacity disabled={!enableBottomBtn} style={{flex: 1, backgroundColor: "#3CE3AC", justifyContent:"center", opacity:enableBottomBtn ? 1 : 0}} onPress={() => alert("Bottom Button OnClick!")}>
            <Text style={{textAlign:"center", color:"black", fontSize:20, fontWeight: 700}}>다음</Text>
        </TouchableOpacity>
    )
}

export default BottomButtonComponent;