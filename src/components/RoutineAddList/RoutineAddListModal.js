import { StyleSheet, View, Pressable, Modal, SafeAreaView, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../styles';

import { closeRoutineAddListModal } from '../../redux/reducerSlices/modalSlice';

import { PretendardedText } from '../CustomComponent/PretendardedText';
import { CategoryRoutineList } from './CategoryRoutineList';
import { ButtonBottom } from '../Buttons/ButtonBottom';
import { RoutineAddListComponent } from './RoutineAddListComponent';

import BackIcon from '../../assets/icons/light/backIcon.svg';

export const RoutineAddListModal = (props) => {
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);

  function handleModal(action) {
    dispatch(action());
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalState.routineAddListModal}>
      <SafeAreaView style={styles.container}>
        <Pressable style={globalStyles.rowFlex}>
          <Pressable
            onPress={() => handleModal(closeRoutineAddListModal)}
            style={styles.backButton}>
            <BackIcon />
          </Pressable>
          <View style={styles.header}>
            <PretendardedText style={styles.headerText}>루틴 추가하기</PretendardedText>
          </View>
        </Pressable>
        <View style={{marginLeft:15, marginRight:15, flex:1}}>
          <RoutineAddListComponent isTutorial={false}/>
        </View>
      </SafeAreaView>
        <ButtonBottom
          text="추가하기"
          style={globalStyles.oneFlex} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 6.9 },
  backButton: {
    paddingRight: '4%',
    paddingLeft: '6%',
    paddingTop: 15,
    paddingBottom: 15,
  },
  header: {
    width: '76%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 700,
    fontSize: 16,
    color: '#222222',
  },
});
