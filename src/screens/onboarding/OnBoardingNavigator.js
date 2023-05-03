import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { FirstOnBoarding } from './FirstOnBoarding';
import { SecondOnBoarding } from './SecondOnBoarding';
import { ThirdOnBoarding } from './ThirdOnBoarding';
import LoginScreen from '../LoginScreenAlpha';

export const OnBoardingNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        unmountInactiveRoutes: true,
      }}>
      <Stack.Screen name="First" component={FirstOnBoarding} options={{ headerShown: false }}/>
      <Stack.Screen name="Second" component={SecondOnBoarding} options={{ headerShown: false }}/>
      <Stack.Screen name="Third" component={ThirdOnBoarding} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}