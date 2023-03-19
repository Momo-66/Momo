import { useEffect, useState } from 'react';
import {View, SafeAreaView} from 'react-native';
import BackgroundImgComponent from '../../components/tutorials/BackgroundImgComponent';
import TutorialHeader from '../../components/tutorials/TutorialHeader';
import InitTutorialScreen from './InitTutorialScreen';
import BottomButtonComponent from '../../components/tutorials/BottomButtonComponent';
import TimePickerScreen from './TimePickerScreen';

import { useDispatch } from 'react-redux';
import { useBackgroundImg } from '../../redux/reducerSlices/tutorialSlice';

const MainTutorialScreen = () => {
    const dispatch = useDispatch();

    function testUseBackgroundImg() {
		dispatch(useBackgroundImg());
	}

    const [tutorialTextColor, settutorialTextColor] = useState("black");
    const [bottomButtonOpacity, setbottomButtonOpacity] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            testUseBackgroundImg();
            settutorialTextColor("white");
            console.log("Main Screen");
        }, 1000);
        setTimeout(() => {
            setbottomButtonOpacity(1);
        }, 6000);
    }, []);

    return(
        <View style={{flex:1}}>
            <BackgroundImgComponent />
            <SafeAreaView style={{flex:1, flexDirection:"column", justifyContent:"space-between", position:"relative"}}>
                <View style={{height: 50}}>
                    <TutorialHeader textColor={tutorialTextColor}/>
                </View>
                <View style={{flex: 1}}>
                    {/* <InitTutorialScreen/> */}
                    <TimePickerScreen/>
                </View>
                <View style={{height: 101}}>
                    <BottomButtonComponent opacity={bottomButtonOpacity}/>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default MainTutorialScreen;