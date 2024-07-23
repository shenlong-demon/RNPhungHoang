import {FC, memo} from 'react';
import View from '@core/components/viewbase/View';
import {StyleSheet} from 'react-native';
import Button from '@core/components/buttonbase/Button';

type Props = {};
export const OperationInfoView: FC<Props> = memo(({}: Props) => {
  return (
    <View.V style={styles.container}>
      {/*<Button.B label={'Set note'} />*/}
      {/*<Button.B label={'Cancel'} />*/}
      {/*<Button.B label={'Receipt'} />*/}
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {},
});
