import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
import Button from '@core/components/buttonbase/Button';
import Label from '@core/components/labelbase/Label';

type Props = {
  message: string;
  onOk: () => void;
  onCancel: () => void;
};

export const YesNoPopup: FC<Props> = memo(
  ({message, onOk, onCancel}: Props) => {
    return (
      <View.V style={styles.container}>
        <Label.T style={{fontWeight: 'bold'}} text={message} />
        <View.V
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Button.B
            style={{backgroundColor: 'red', marginRight: 20}}
            textStyle={{color: 'white'}}
            label="No"
            onPress={onCancel}
          />
          <Button.B
            style={{backgroundColor: 'green', marginLeft: 20}}
            textStyle={{color: 'white'}}
            label="Yes"
            onPress={onOk}
          />
        </View.V>
      </View.V>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
