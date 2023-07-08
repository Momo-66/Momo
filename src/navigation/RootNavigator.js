import React, {useEffect, useState} from 'react';
import { Platform } from 'react-native';
import { useSelector, useDispatch  } from 'react-redux';


import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import RoutineEditScreen from '../screens/RoutineEditScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import ClosetScreen from '../screens/ClosetScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import LoginScreenAlpha from '../screens/LoginScreenAlpha';
import { MainTutorialScreen } from '../screens/tutorials/MainTutorialScreen';
import { VersionScreen } from '../screens/ViersionScreen';
import { OnBoardingNavigator } from '../screens/onboarding/OnBoardingNavigator';

import { HomeTab } from '../components/NavigatorComponent/HomeTab';
import { RoutineTab } from '../components/NavigatorComponent/RoutineTab';
import { ChallengeTab } from '../components/NavigatorComponent/ChallengeTab';
import { ClosetTab } from '../components/NavigatorComponent/ClosetTab';
import { SettingsTab } from '../components/NavigatorComponent/SettingsTab';

import { logout } from '../redux/reducerSlices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, storeData } from '../utils/AsyncStorageUtils';
import { setIsTutorialFinished } from '../redux/reducerSlices/userSlice';

const AuthStack = createStackNavigator();
const MainScreenTab = createBottomTabNavigator();

const TabComponent = () => {
  return (
    <MainScreenTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          marginLeft: 20,
          marginRight: 20,
          borderRadius: 100,
          borderStyle: 'solid',
          borderColor: '#EEEEEE',
          borderWidth: 1.5,
          paddingBottom: 0,
          marginBottom: 30,
          height: Platform.OS === 'ios' ? '7%' : '9%',
          elevation:0,
        },
      }}
      >
      <MainScreenTab.Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return <HomeTab focused={focused}/>;
          },
        }} />
      <MainScreenTab.Screen
        name="Routine"
        component={RoutineEditScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return <RoutineTab focused={focused}/>;
          },
        }} />
      <MainScreenTab.Screen
        name="Challenge"
        component={ChallengeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return <ChallengeTab focused={focused}/>;
          },
        }} />
      <MainScreenTab.Screen
        name="Closet"
        component={ClosetScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return <ClosetTab focused={focused}/>;
          },
        }} />
      <MainScreenTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return <SettingsTab focused={focused}/>;
          },
        }} />
    </MainScreenTab.Navigator>
  );
};

export const RootNavigator = () => {

  const isAuthUser = useSelector((state) => state.user.signedIn);
  const isTutorialFinished = useSelector((state) => state.user.isTutorialFinished);
  const dispatch = useDispatch();
  
  function setIsTutorialFinishedfun(value) {
    dispatch(setIsTutorialFinished({
        isTutorialFinished: value,
    }));
  }

  const getDataFromStorage = async () => {
    try {
      const result = await getData('IsTutorialFinished'); 
      console.log(result);
      if (result === '1') {
        setIsTutorialFinishedfun(true);
      }
      else {
        setIsTutorialFinishedfun(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const test_logout = () => {
    dispatch(logout());
    AsyncStorage.clear();
  };

  useEffect(() => {
    // test_logout();
    getDataFromStorage();
  }, []);

  return (
    <AuthStack.Navigator
      name="ROOT"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#F9F9F9',
        },
      }}
    >
      {isTutorialFinished && isAuthUser? (
        <AuthStack.Screen name="Tabs" component={TabComponent} options={{gestureEnabled: false,}}/>
        
      ) : !isTutorialFinished && isAuthUser ? (<AuthStack.Screen name="Tutorial" component={MainTutorialScreen}/>) 
      : (<AuthStack.Screen name="Onboarding" component={OnBoardingNavigator}/>)
      }
      <AuthStack.Screen name="Version" component={VersionScreen}/>
    </AuthStack.Navigator>
  );
};
