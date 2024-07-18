import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
import Button from '@core/components/buttonbase/Button';
import Label from '@core/components/labelbase/Label';

type Props = {
  onCancel: () => void;
};

export const ActionMenuPopup: FC<Props> = memo(({onCancel}: Props) => {
  return (
    <View.V style={styles.container}>
      <View.Row style={{backgroundColor: 'green'}}>
        <Label.T text={'Action'} style={{color: 'white'}} />
      </View.Row>
      <Button.B label="Close" onPress={onCancel} />
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
});
