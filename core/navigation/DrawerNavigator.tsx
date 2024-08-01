import React, {FC, memo} from 'react';
import {Drawer} from './NavigationContainer';
import {DrawerNavigationOptions} from '@react-navigation/drawer/src/types';

type Screen = {
  name: string;
  component: FC;
  options?: any;
};
type Props = {
  screenOptions?: any;
  screens: Screen[];
};

export const DrawerNavigator: FC<Props> = memo(
  ({screenOptions, screens, ...rest}) => {
    return (
      <Drawer.Navigator {...rest} screenOptions={screenOptions}>
        {(screens || []).map((screen: Screen): any => {
          return (
            <Drawer.Screen
              name={screen.name}
              component={screen.component}
              options={screen.options}
            />
          );
        })}
      </Drawer.Navigator>
    );
  },
);
