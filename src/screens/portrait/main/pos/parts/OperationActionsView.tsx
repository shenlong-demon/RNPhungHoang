import {FC, memo} from 'react';
import View from '@core/components/viewbase/View';
import {StyleSheet} from 'react-native';
import Button from '@core/components/buttonbase/Button';
import {useOperationContext, useOperationFacade} from '@src/business';

type Props = {};
export const OperationActionsView: FC<Props> = memo(({}: Props) => {
  const {receipt} = useOperationFacade();
  const {selectedBooking} = useOperationContext();
  return (
    <View.V style={styles.container}>
      {!!selectedBooking ? (
        <>
          <Button.B label={`Set note for ${selectedBooking.name}`} />
          <Button.B label={`Cancel ${selectedBooking.name}`} />
        </>
      ) : null}

      <Button.B label={'Receipt'} onPress={receipt} />
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {},
});
