import React, {FC, memo} from 'react';
import {Label, View} from '@core/components';

type Props = {};
export const MainScreen: FC<Props> =memo( ({}) => {
  return <View.V >
    <Label.T text={'MAIN'}/>
  </View.V>;
});
