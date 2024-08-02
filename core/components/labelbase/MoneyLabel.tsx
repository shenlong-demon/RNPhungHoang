import React, {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import {LabelBase, LabelProps} from '@core/components/labelbase/LabelBase';
import {CurrencyUtils} from '@core/common';

type Props = Omit<LabelProps, 'text'> & {
  value?: number;
};
export const MoneyLabel: FC<Props> = memo(({value, style, ...rest}) => {
  const finalStyle = StyleSheet.flatten([commonStyle.common, style]);
  const text: string = CurrencyUtils.format(value || 0);
  return <LabelBase style={finalStyle} {...rest} text={text} />;
});

const commonStyle = StyleSheet.create({
  common: {
    // height: 20,
  },
});
