import { StyleSheet, View, Image, Pressable } from 'react-native';
import React from 'react';
import PretendardedText from './CustomComponent/PretendardedText';

import actionImg from '../assets/images/action_img.png';
import incompleteAction from '../assets/images/action_incomplete.png';
import completeAction from '../assets/images/action_complete.png';

const Action = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Image source={actionImg} style={styles.actionImage} />
                <PretendardedText style={styles.actionName}>{props.name}</PretendardedText>
            </View>
            <Pressable onPress={() => props.updateCompleteStatus(props.id)}>
                <Image source={props.complete ? completeAction : incompleteAction} style={{ marginRight: 14 }} />
            </Pressable>
        </View>
    );
};

export default Action;

const styles = StyleSheet.create({
    container: { width: '100%', height: 92, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1.5, borderColor: '#eee', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
    left: { flexDirection: 'row', alignItems: 'center' },
    actionImage: { marginLeft: 14, marginRight: 20 },
    actionName: { fontWeight: 700, fontSize: 16, color: '#4C4C4C' },
});
