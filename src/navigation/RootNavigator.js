import React, {useEffect,useState} from 'react';
import { Image, Platform } from 'react-native';
import {useDispatch,useSelector} from 'react-redux';


import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import RoutineEditScreen from '../screens/RoutineEditScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import ClosetScreen from '../screens/ClosetScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpScreen from '../screens/SignUpScreen';

// TO-DO: replace pngs to svgs when svg configuration has been done
import Home from '../assets/icons/light/home.png';
import HomeFocused from '../assets/icons/light/home_focused.png';
import Routine from '../assets/icons/light/routine.png';
import RoutineFocused from '../assets/icons/light/routine_focused.png';
import Challenge from '../assets/icons/light/challenge.png';
import ChallengeFocused from '../assets/icons/light/challenge_focused.png';
import Closet from '../assets/icons/light/closet.png';
import ClosetFocused from '../assets/icons/light/closet_focused.png';
import Settings from '../assets/icons/light/settings.png';
import SettingsFocused from '../assets/icons/light/settings_focused.png';


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
            return <Image source={focused ? HomeFocused : Home} />;
            // return focused ? <Home/> <HomeFocused/>:
          },
        }} />
      <MainScreenTab.Screen
        name="Routine"
        component={RoutineEditScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return <Image source={focused ? RoutineFocused : Routine} />;
          },
        }} />
      <MainScreenTab.Screen
        name="Challenge"
        component={ChallengeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return <Image source={focused ? ChallengeFocused : Challenge} />;
          },
        }} />
      <MainScreenTab.Screen
        name="Closet"
        component={ClosetScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return <Image source={focused ? ClosetFocused : Closet} />;
          },
        }} />
      <MainScreenTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return <Image source={focused ? SettingsFocused : Settings} />;
          },
        }} />
    </MainScreenTab.Navigator>
  );
};

export const RootNavigator = () => {

  const isAuthUser = useSelector((state) => state.user.signedIn);
  
  return (
    <AuthStack.Navigator
      name="ROOT"
      screenOptions={{ headerShown: false }}
    >
      {isAuthUser? (
        <AuthStack.Screen name="Tabs" component={TabComponent}
          options={{
            gestureEnabled: false,
          }}
          />
      ) : (
        <AuthStack.Screen name="Login" component={LoginScreen}/>)
      }
      <AuthStack.Screen name="SignUp" component={SignUpScreen}/>
    </AuthStack.Navigator>
  );
};
