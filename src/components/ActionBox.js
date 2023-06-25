import React, {useRef} from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { openRoutineOptionModal } from '../redux/reducerSlices/modalSlice';
import RoutineOptionModal from './Modals/RoutineOptionModal';

import SettingButton from '../assets/images/setting_button.svg';

import DayList from './DayList';

export const ActionBox = (props) => {
  const dispatch = useDispatch();
  const buttonRef = useRef(null);


  const popUpRoutineOptionModal = (action) => {
    buttonRef.current.measureInWindow((x, y, width,height) => {
      const {id, name, emoji, limit_time, active_day} = props
      x += 10;
      dispatch(action({x, y, id, name, emoji, limit_time, active_day}));
    })
  };

  return (
    <View key={props.id} style={styles.actionBoxContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{ marginLeft: 15 }}>
          <Text style={{fontWeight: '700', fontSize: 16, color: '#4C4C4C'}}>
            {props.emoji} {props.name}
            <Text style={{fontWeight: '600', fontSize: 16, color: '#808080'}}>
              {' '}
              +{props.limit_time}분
            </Text>
          </Text>
          <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <DayList key={props.id} id={props.id} active_day={props.active_day} />
          </View>
        </View>
      </View>
      <View ref={buttonRef} style={{height: '100%',}}>
        <Pressable
          onPress={() => popUpRoutineOptionModal(openRoutineOptionModal)}
          activeOpacity={1}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          >
          <SettingButton/>
        </Pressable>
        <RoutineOptionModal/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionBoxContainer: {
    width: '100%',
    height: 92,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
});

