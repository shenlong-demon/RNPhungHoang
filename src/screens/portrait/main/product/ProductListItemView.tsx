import React, { FC, memo } from 'react';
import { Label, View } from '@core/components';
import { Product, STATUS } from '@src/business';
import { StyleSheet } from 'react-native';

type Props = {
  item: Product;
  index: number;
  onClick: () => void;
};

export const ProductListItemView: FC<Props> = memo(
  ({ item, index, onClick }) => {
    return (
      <View.Row
        style={[
          styles.container,
          {
            backgroundColor:
              item.status === STATUS.ACTIVE
                ? index % 2 === 0
                  ? 'rgba(234,252,234,0.37)'
                  : 'white'
                : index % 2 === 0
                ? 'rgba(250,236,236,0.95)'
                : 'rgba(246,220,220,0.95)',
          },
        ]}
        onPress={onClick}>
        <Label.T text={item.name} />
        <Label.T text={`${item.quantity}`} />
      </View.Row>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});
