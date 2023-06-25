import { View, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { PretendardedText } from '../../components/CustomComponent/PretendardedText';
import { ButtonLarge } from '../../components/Buttons/ButtonLarge';

import OnBoardingImg from '../../assets/images/ThirdOnboarding.gif';
import OnBoardingIndicatorImg from '../../assets/images/ThirdOnboardingIndicator.svg';

export const ThirdOnBoarding = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={{alignItems:'center', marginTop: 50}}>
        <Image source={OnBoardingImg} style={{width:350, height:350}}/>
      </View>
      <View style={{alignItems:'center'}}>
        <OnBoardingIndicatorImg/>
      </View>
      <View style={{alignItems:'center', marginTop:52}}>
        <PretendardedText style={{fontWeight:'800', fontSize:24, color:'#222222'}}>갓생 뽐내기</PretendardedText>
      </View>
      <View style={{alignItems:'center', marginTop:20}}>
        <PretendardedText style={{fontWeight:'400', fontSize:16, color:'#4C4C4C'}}>나의 모모를 SNS에 공유해</PretendardedText>
        <PretendardedText style={{fontWeight:'400', fontSize:16, color:'#4C4C4C'}}>갓생 사는 스스로를 자랑해 봐요</PretendardedText>
      </View>
      <View style={{alignItems:'center', marginTop:52}}>
        <ButtonLarge type={'default'} text={'시작하기'} icon={false} action={()=>navigation.navigate('Login')}/>
      </View>
    </SafeAreaView>
  );
}