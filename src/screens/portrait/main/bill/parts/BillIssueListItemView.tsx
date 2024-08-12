import { BillIssue } from '@src/business';
import { FC, memo } from 'react';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';
import { StyleSheet } from 'react-native';
import Image from '@core/components/imagebase/Image';
import { CONSTANTS } from '@core/common';

type Props = {
  item: BillIssue;
  index: number;
};
export const BillIssueListItemView: FC<Props> = memo(
  ({ item, index }: Props) => {
    return (
      <View.V
        style={[
          styles.container,
          {
            backgroundColor:
              index % 2 === 0 ? 'rgba(234,252,234,0.37)' : 'white',
          },
        ]}>
        {!!item.image && (
          <Image.I
            style={styles.image}
            source={{ uri: item.image || CONSTANTS.STR_EMPTY }}
          />
        )}
        <Label.T text={item.note || CONSTANTS.STR_EMPTY} />
      </View.V>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'green',
  },
  name: {
    flex: 0.6,
    paddingLeft: 10,
  },
  index: {
    // backgroundColor: 'red',
  },
  image: {
    width: '100%',
    height: 300,
    paddingBottom: 10,
    resizeMode: 'cover',
  },
  price: {
    flex: 0.3,
    textAlign: 'right',
  },
});
