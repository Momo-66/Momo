import {StyleSheet, View, SafeAreaView, Linking} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {PretendardedText} from '../components/CustomComponent/PretendardedText';
import {ButtonLarge} from '../components/Buttons/ButtonLarge';

export const SettingsScreen = () => {
  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const navigation = useNavigation();

  const open66TeamStory = () => {};

  const openMomoStory = () => {};

  const openImmediateFeedback = () => {};

  const openVersionInfoScreen = () => {
    navigation.navigate('Version')
  };

  const openReleaseNotification = () => {
    Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSfSquNhinU_Unhq11ZVacTFjRzimSut-Y8KjZm2xi_nB4bSSA/viewform?usp=sf_link');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F9F9F9'}}>
      <SafeAreaView style={{flex: 1, alignItems: 'center', width: '100%'}}>
        <PretendardedText style={styles.header}>환경설정</PretendardedText>
        <View style={styles.buttons}>
          <ButtonLarge type={'default'} text={'66팀 이야기'} icon={false} action={open66TeamStory}/>
          <ButtonLarge type={'default'} text={'모모스토리'} icon={false} action={openMomoStory}/>
          <ButtonLarge type={'default'} text={'즉각 피드백'} icon={false} action={openImmediateFeedback}/>
          <ButtonLarge type={'default'} text={'버전 정보'} icon={false} action={openVersionInfoScreen}/>
          <ButtonLarge type={'default'} text={'출시 알림 받기'} icon={true} action={openReleaseNotification}/>
          {/* <View style={styles.toggleRow}>
                        <PretendardedText style={styles.toggleText}>사진으로 인증하기</PretendardedText>
                        <Switch
                            trackColor={{ false: '#595959', true: '#3CE3AC' }}
                            thumbColor={isEnabled ? '#FFFFFF' : '#B3B3B3'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View> */}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontWeight: 700,
    fontSize: 16,
    color: '#222222',
    marginTop: 30,
    marginBottom: 30,
  },
  buttons: {
    width: '100%',
    alignItems: 'center',
    flex: 0.65,
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  toggleText: {
    fontWeight: 700,
    fontSize: 16,
  },
});
