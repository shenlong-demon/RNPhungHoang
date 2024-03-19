import React, {memo} from 'react';
import {NavigationContainer as NavigationContainerLib} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';

enableScreens(false);
export const NavigationContainer = props => {
  return (
    <NavigationContainerLib>{props.children}</NavigationContainerLib>
  );
};

export default memo(NavigationContainer);
