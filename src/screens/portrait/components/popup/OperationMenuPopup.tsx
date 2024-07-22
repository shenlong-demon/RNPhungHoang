import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
import Button from '@core/components/buttonbase/Button';
import Label from '@core/components/labelbase/Label';

type Props = {
  onReceipt: () => void;
  onCancel: () => void;
};

export const OperationMenuPopup: FC<Props> = memo(
  ({onCancel, onReceipt}: Props) => {
    return (
      <View.V style={styles.container}>
        <View.Row style={{backgroundColor: 'green'}}>
          <Label.T text={'Action'} style={{color: 'white'}} />
        </View.Row>

        <Button.B label="Receipt" onPress={onReceipt} />
        <Button.B label="Close" onPress={onCancel} />
      </View.V>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
});
