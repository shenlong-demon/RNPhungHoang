import React, { FC, memo } from 'react';
import { Stack } from './NavigationContainer';

type Screen = {
  name: string;
  component: FC;

  options?: any;
};
type Props = {
  initialRouteName?: string;
  screens: Screen[];
  screenOptions?: any;
};

export const StackNavigator: FC<Props> = memo(({ screens, ...rest }) => {
  return (
    <Stack.Navigator {...rest}>
      {(screens || []).map((screen: Screen): any => {
        return (
          <Stack.Screen
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        );
      })}
    </Stack.Navigator>
  );
});
