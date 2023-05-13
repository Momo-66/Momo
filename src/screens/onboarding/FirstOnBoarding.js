import { View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { PretendardedText } from '../../components/CustomComponent/PretendardedText';
import { ButtonLarge } from '../../components/Buttons/ButtonLarge';

import RightBlackButtonImg from '../../assets/images/TutorialHeaderRightBlackButton.png';
import OnBoardingImg from '../../assets/images/FirstOnboarding.gif';
import OnBoardingIndicatorImg from '../../assets/images/FirstOnboardingIndicator.svg';

export const FirstOnBoarding = () => {
  const navigation = useNavigation();

  return (
	<SafeAreaView>
	  <View style={{ flex: 1, margin: 15, flexDirection: "row", justifyContent: "flex-end" }}>
		<TouchableOpacity onPress={() => navigation.navigate('Third')}>
		  <Image source={RightBlackButtonImg} />
		</TouchableOpacity>
	  </View>
	  <View style={{ alignItems: 'center' }}>
		<Image source={OnBoardingImg} style={{width:350, height:350}}/>
	  </View>
	  <View style={{ alignItems: 'center' }}>
		<OnBoardingIndicatorImg />
	  </View>
	  <View style={{ alignItems: 'center', marginTop: 52 }}>
		<PretendardedText style={{ fontWeight: '800', fontSize: 24, color: '#222222' }}>작은 습관에서 큰 나로</PretendardedText>
	  </View>
	  <View style={{ alignItems: 'center', marginTop: 20 }}>
		<PretendardedText style={{ fontWeight: '400', fontSize: 16, color: '#4C4C4C' }}>기상 후 실천할 작은 습관을 선택해</PretendardedText>
		<PretendardedText style={{ fontWeight: '400', fontSize: 16, color: '#4C4C4C' }}>나만의 루틴을 만들어요</PretendardedText>
	  </View>
	  <View style={{ alignItems: 'center', marginTop: 52 }}>
		<ButtonLarge type={'light'} text={'다음'} icon={false} action={() => navigation.navigate('Second')} />
	  </View>
	</SafeAreaView>
  );
}