import {FC, memo} from 'react';
import View from '@core/components/viewbase/View';
import {StyleSheet} from 'react-native';
type Props = {};
export const CustomerListView: FC<Props> = memo(({}: Props) => {
  return <View.V style={styles.container}>

  </View.V>;
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
