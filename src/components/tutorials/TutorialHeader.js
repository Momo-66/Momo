import { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const TutorialHeader = props => {
    useEffect(() => {
        console.log("헤더창 로드")
    }, []);

    return (
    <View style={{flex: 1, margin:15, flexDirection:"row", justifyContent:"space-between"}}>
        <TouchableOpacity onPress={() => alert('이전으로')}>
            <Text style={{color:props.textColor}}>이전으로</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('건너뛰기')}>
            <Text style={{color:props.textColor}}>건너뛰기</Text>    
        </TouchableOpacity>
    </View>
    )
}

export default TutorialHeader;