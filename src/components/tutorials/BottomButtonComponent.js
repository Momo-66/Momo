import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const BottomButtonComponent = props => {
    return (
        <TouchableOpacity style={{flex: 1, backgroundColor: "#3CE3AC", justifyContent:"center", opacity:props.opacity}} onPress={() => alert("Bottom Button OnClick!")}>
            <Text style={{textAlign:"center", color:"black", fontSize:20, fontWeight: 700}}>다음</Text>
        </TouchableOpacity>
    )
}

export default BottomButtonComponent;