import React, { FC, memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
type Screen = {
  name: string;
  component: FC;

  options?: any;
};
type Props = {
  screens: Screen[];
};

export const StackNavigator: FC<Props> = memo(({ screens, ...rest }) => {
  return (
    <Stack.Navigator {...rest}>
      {(screens || []).map((screen: Screen): any => {
        return <Stack.Screen name={screen.name} component={screen.component} options={screen.options} />;
      })}
    </Stack.Navigator>
  );
});
