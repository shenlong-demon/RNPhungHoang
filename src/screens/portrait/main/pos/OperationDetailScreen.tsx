import {FC, memo} from 'react';
import {View} from '@core/components';
import {StyleSheet} from 'react-native';
import {useOperationContext} from '@src/business';
import {BookingListView} from '@src/screens/portrait/main/pos/parts';
import Label from '@core/components/labelbase/Label';
import {CONSTANTS} from '@core/common';

type Props = {};
export const OperationDetailScreen: FC<Props> = memo(({}) => {
  const {operation} = useOperationContext();

  return (
    <View.V style={styles.container}>
      <View.V>
        <Label.T text={operation?.name || CONSTANTS.STR_EMPTY} />
      </View.V>
      <View.V>
        <BookingListView />
      </View.V>
    </View.V>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
