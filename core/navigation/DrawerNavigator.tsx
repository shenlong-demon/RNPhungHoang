import React, { FC, memo } from 'react';
import { Drawer } from './NavigationContainer';

type Screen = {
  name: string;
  component: FC;
  options?: any;
};
type Props = {
  screenOptions?: any;
  screens: Screen[];
  drawerContent?: (props: any) => any;
};

export const DrawerNavigator: FC<Props> = memo(
  ({ screenOptions, screens, ...rest }) => {
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
