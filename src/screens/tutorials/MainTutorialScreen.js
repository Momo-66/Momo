import { useEffect, useState } from 'react';
import {View, SafeAreaView} from 'react-native';
import BackgroundImgComponent from '../../components/tutorials/BackgroundImgComponent';
import TutorialHeader from '../../components/tutorials/TutorialHeader';

const MainTutorialScreen = () => {
    const [isChangeBackground, setisChangeBackground] = useState(false);
    const [tutorialTextColor, settutorialTextColor] = useState("black");

    useEffect(() => {
        setTimeout(() => {
            setisChangeBackground(true);
            settutorialTextColor("white");
            console.log("Main Screen");
        }, 3000);
    }, []);

    return(
        <View style={{flex:1}}>
            <BackgroundImgComponent isChangeBackground={isChangeBackground}/>
            <SafeAreaView style={{flex:1}}>
                <TutorialHeader textColor={tutorialTextColor}/>
            </SafeAreaView>
        </View>
    );
}

export default MainTutorialScreen;