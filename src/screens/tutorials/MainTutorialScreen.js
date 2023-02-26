import { useEffect, useState } from 'react';
import {View, SafeAreaView} from 'react-native';
import BackgroundImgComponent from '../../components/tutorials/BackgroundImgComponent';
import TutorialHeader from '../../components/tutorials/TutorialHeader';
import InitTutorialScreen from './InitTutorialScreen';
import BottomButtonComponent from '../../components/tutorials/BottomButtonComponent';

const MainTutorialScreen = () => {
    const [isChangeBackground, setisChangeBackground] = useState(false);
    const [tutorialTextColor, settutorialTextColor] = useState("black");
    const [bottomButtonOpacity, setbottomButtonOpacity] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setisChangeBackground(true);
            settutorialTextColor("white");
            console.log("Main Screen");
        }, 3000);
        setTimeout(() => {
            setbottomButtonOpacity(1);
        }, 6000);
    }, []);

    return(
        <View style={{flex:1}}>
            <BackgroundImgComponent isChangeBackground={isChangeBackground}/>
            <SafeAreaView style={{flex:1, flexDirection:"column", justifyContent:"space-between", position:"relative"}}>
                <View style={{height: 50}}>
                    <TutorialHeader textColor={tutorialTextColor}/>
                </View>
                <View>
                    <InitTutorialScreen/>
                </View>
                <View style={{height: 101}}>
                    <BottomButtonComponent opacity={bottomButtonOpacity}/>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default MainTutorialScreen;