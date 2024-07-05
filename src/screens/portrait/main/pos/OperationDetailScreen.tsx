import {FC, memo} from 'react';
import {View} from '@core/components';
import {StyleSheet} from 'react-native';
import {useOperationContext} from '@src/business';
import {OperationBookingListView} from '@src/screens/portrait/main/pos/parts';

type Props = {};
export const OperationDetailScreen: FC<Props> = memo(({}) => {
  const {operation} = useOperationContext();

  return (
    <View.V style={styles.container}>
      <View.V></View.V>
      <View.V>
        <OperationBookingListView />
      </View.V>
    </View.V>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
