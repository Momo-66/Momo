import { useEffect } from 'react';
import { View, Text } from 'react-native';

const TutorialHeader = props => {
    useEffect(() => {
        console.log("헤더창 로드")
    }, []);

    return (
    <View style={{flex: 1, margin:15, flexDirection:"row", justifyContent:"space-between"}}>
        <Text style={{color:props.textColor}}>이전으로</Text>
        <Text style={{color:props.textColor}}>건너뛰기</Text>
    </View>
    )
}

export default TutorialHeader;