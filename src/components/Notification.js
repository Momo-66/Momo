import { StyleSheet, Image } from 'react-native';
import React from 'react';

import NotificationIcon from '../assets/icons/light/notification.png';

const Notification = () => {
    return (
        <Image source={NotificationIcon} style={styles.notification}/>
    );
};

export default Notification;

const styles = StyleSheet.create({
    notification: { marginTop: 12 },
});
