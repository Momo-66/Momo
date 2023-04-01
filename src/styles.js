import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: { height: '100%' },
    oneFlex: { flex: 1 },
    rowFlex: { flexDirection: 'row' },
});

// styles for modals
export const modalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
    },
    modalView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 270,
        backgroundColor: 'white',
        borderRadius: 8,
        borderColor: '#EEE',
        borderStyle: 'solid',
        borderWidth: 1.5,
    },
    title: {
        fontWeight: 700,
        fontSize: 20,
        color: '#222222',
        marginTop: 30,
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 30,
    },
    button: {
        width: 134,
        height: 68,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3CE3AC',
    },
    rightButton: {
        borderBottomRightRadius: 8,
    },
    buttonText: {
        fontWeight: 700,
        fontSize: 14,
    },
});
