import React, { FC, memo } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
type Screen = {
  name: string;
  component: FC;
  options?: any;
};
type Props = {
  screens: Screen[];
};

export const DrawerNavigator: FC<Props> = memo(({ screens, ...rest }) => {
  return (
    <Drawer.Navigator {...rest}>
      {(screens || []).map((screen: Screen): any => {
        return <Drawer.Screen name={screen.name} component={screen.component} options={screen.options} />;
      })}
    </Drawer.Navigator>
  );
});
