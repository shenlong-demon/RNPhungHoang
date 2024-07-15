import React, {FC, memo} from 'react';
import {View} from '@core/components';
import {StyleSheet} from 'react-native';
import {useOperationContext} from '@src/business';
import {BookingListView} from '@src/screens/portrait/main/pos/parts';
import Button from '@core/components/buttonbase/Button';
import {useNavigation} from '@core/navigation';
import {Route} from '@src/screens/portrait/Route';

type Props = {};
export const OperationDetailScreen: FC<Props> = memo(({}) => {
  const {operation} = useOperationContext();
  const {navigate} = useNavigation();

  const openMenu = (): void => {
    navigate(Route.MENU_SCREEN);
  };
  return (
    <View.V style={styles.container}>
      <BookingListView />
      <Button.FloatCircle position={'bottom|right'} onPress={openMenu} />
    </View.V>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});
