import { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import {useSelector} from 'react-redux';

const TutorialHeader = (props) => {
    const textColor = useSelector((state) => state.tutorial.textColor);
    const enableHeaderRightBtn = useSelector((state) => state.tutorial.enableHeaderRightBtn);
    const enableHeaderLeftBtn = useSelector((state) => state.tutorial.enableHeaderLeftBtn);

    useEffect(() => {
        console.log("헤더창 로드")
    }, []);

    return (
    <View style={{flex: 1, margin:15, flexDirection:"row", justifyContent:"space-between"}}>
        <TouchableOpacity onPress={() => alert('이전으로')} style={{opacity:enableHeaderLeftBtn ? 1 : 0}} disabled={!enableHeaderLeftBtn}>
            <Text style={{color:textColor}}>이전으로</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('건너뛰기')} style={{opacity:enableHeaderRightBtn ? 1 : 0}} disabled={!enableHeaderRightBtn}>
            <Text style={{color:textColor}}>건너뛰기</Text>
        </TouchableOpacity>
    </View>
    )
}

export default TutorialHeader;