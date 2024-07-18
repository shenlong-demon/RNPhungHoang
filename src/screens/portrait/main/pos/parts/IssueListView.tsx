import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import {View} from '@core/components';

type Props = {};
export const IssueListView: FC<Props> = memo(({}: Props) => {
  return <View.V style={styles.container}></View.V>;
});
const styles = StyleSheet.create({
  container: {flex: 1},
  listContainer: {flex: 1},
});
