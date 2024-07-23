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
        <Label.T text={message} />
        <View.Row>
          <Button.B label="No" onPress={onCancel} />
          <Button.B label="Yes" onPress={onOk} />
        </View.Row>
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
