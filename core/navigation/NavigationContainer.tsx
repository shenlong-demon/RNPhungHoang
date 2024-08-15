import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer as NavigationContainerLib,
} from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

enableScreens(false);
export const Drawer = createDrawerNavigator();
export const Stack = createNativeStackNavigator();
type Props = {
  children: React.ReactNode;
};
export const navigationRef = createNavigationContainerRef();
export const NavigationContainer = (props: Props) => {
  return <NavigationContainerLib>{props.children}</NavigationContainerLib>;
};
