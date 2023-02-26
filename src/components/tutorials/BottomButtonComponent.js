import React from 'react';
import { View, Text } from 'react-native';

const BottomButtonComponent = props => {
    return (
    <View style={{flex: 1, backgroundColor: "#3CE3AC", justifyContent:"center", opacity:props.opacity}}>
        <Text style={{textAlign:"center", color:"black", fontSize:20, fontWeight: 700}}>다음</Text>
    </View>
    )
}

export default BottomButtonComponent;