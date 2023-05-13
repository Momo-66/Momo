import { View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { PretendardedText } from '../../components/CustomComponent/PretendardedText';
import { ButtonLarge } from '../../components/Buttons/ButtonLarge';

import RightBlackButtonImg from '../../assets/images/TutorialHeaderRightBlackButton.png';
import OnBoardingImg from '../../assets/images/SecondOnboarding.gif';
import OnBoardingIndicatorImg from '../../assets/images/SecondOnboardingIndicator.svg';

export const SecondOnBoarding = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={{flex: 1, margin:15, flexDirection:"row", justifyContent:"flex-end"}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Third')}>
          <Image source={RightBlackButtonImg} />
        </TouchableOpacity>
      </View>
      <View style={{alignItems:'center'}}>
        <Image source={OnBoardingImg} style={{width:350, height:350}}/>
      </View>
      <View style={{alignItems:'center'}}>
        <OnBoardingIndicatorImg/>
      </View>
      <View style={{alignItems:'center', marginTop:52}}>
        <PretendardedText style={{fontWeight:'800', fontSize:24, color:'#222222'}}>나만의 모모와 함께</PretendardedText>
      </View>
      <View style={{alignItems:'center', marginTop:20}}>
        <PretendardedText style={{fontWeight:'400', fontSize:16, color:'#4C4C4C'}}>루틴을 실천해가며 나만의 모모를</PretendardedText>
        <PretendardedText style={{fontWeight:'400', fontSize:16, color:'#4C4C4C'}}>성장시키고 꾸밀 수 있어요</PretendardedText>
      </View>
      <View style={{alignItems:'center', marginTop:52}}>
        <ButtonLarge type={'light'} text={'다음'} icon={false} action={()=>navigation.navigate('Third')}/>
      </View>
    </SafeAreaView>
  );
}