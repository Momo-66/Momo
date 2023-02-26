import { useEffect, useState } from 'react';
import {View} from 'react-native';
import BackgroundImgComponent from '../../components/tutorials/BackgroundImgComponent';

const MainTutorialScreen = () => {
    const [isChangeBackground, setisChangeBackground] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setisChangeBackground(true);
            console.log("Main Screen");
        }, 3000);
    }, []);

    return(
        <View style={{flex:1}}>
            <BackgroundImgComponent isChangeBackground={isChangeBackground}/>
        </View>
    );
}

export default MainTutorialScreen;