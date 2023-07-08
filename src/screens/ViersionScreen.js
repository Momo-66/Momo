import {StyleSheet, View, SafeAreaView} from 'react-native';
import React from 'react';

import {PretendardedText} from '../components/CustomComponent/PretendardedText';
import MomoSymbol from '../assets/images/momo_symbol.svg'

export const VersionScreen = () => {

  return (
    <View style={{flex: 1, backgroundColor: '#F9F9F9'}}>
      <SafeAreaView style={{flex: 1, alignItems: 'center', width: '100%'}}>
        <PretendardedText style={styles.header}>버전 정보</PretendardedText>
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}>

          <View style={{flex: 8, alignItems: 'center', width: '100%', paddingTop: '15%'}}>
            <MomoSymbol/>
            <PretendardedText style={{paddingTop: '5%', fontWeight: '700', fontSize: 16, color: '#222222'}}>최신 버전입니다.</PretendardedText>
            <PretendardedText style={{fontWeight: '500', fontSize: 16, color: '#808080'}}>현재 버전 : Alpha Ver.</PretendardedText>
          </View>
          <View style={{flex: 0.8, alignItems: 'center', width: '100%'}}>
            <PretendardedText style={{fontWeight: '500', fontSize: 14, color: '#B3B3B3'}}>저희 66team은 늘 더 나은 사용자 경험을 위해</PretendardedText>
            <PretendardedText style={{fontWeight: '500', fontSize: 14, color: '#B3B3B3'}}>빠른 업데이트를 하고있어요.</PretendardedText>
          </View>
          
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
  
});
