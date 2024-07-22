import React, {FC, memo} from 'react';
import View from '@core/components/viewbase/View';
import Button from '@core/components/buttonbase/Button';
import {StyleSheet} from 'react-native';
import {OPERATION_ACTION_SCREEN, useOperationContext} from '@src/business';
type Props = {};
export const OperationTabActionView: FC<Props> = memo(({}: Props) => {
  const {operationActionScreenIndex, setOperationActionScreenIndex} =
    useOperationContext();
  return (
    <View.V style={styles.container}>
      <Button.B
        style={[
          styles.buttonMenu,
          operationActionScreenIndex === OPERATION_ACTION_SCREEN.BOOKING_LIST
            ? styles.buttonMenuHighlight
            : {},
        ]}
        onPress={() => {
          setOperationActionScreenIndex(OPERATION_ACTION_SCREEN.BOOKING_LIST);
        }}
      />
      <Button.B
        style={[
          styles.buttonMenu,
          operationActionScreenIndex === OPERATION_ACTION_SCREEN.ISSUE
            ? styles.buttonMenuHighlight
            : {},
        ]}
        onPress={() => {
          setOperationActionScreenIndex(OPERATION_ACTION_SCREEN.ISSUE);
        }}
      />
      <Button.B
        style={[
          styles.buttonMenu,
          operationActionScreenIndex === OPERATION_ACTION_SCREEN.ACTION
            ? styles.buttonMenuHighlight
            : {},
        ]}
        onPress={() => {
          setOperationActionScreenIndex(OPERATION_ACTION_SCREEN.ACTION);
        }}
      />
      <Button.B
        style={[
          styles.buttonMenu,
          operationActionScreenIndex === OPERATION_ACTION_SCREEN.OPERATION_INFO
            ? styles.buttonMenuHighlight
            : {},
        ]}
        onPress={() => {
          setOperationActionScreenIndex(OPERATION_ACTION_SCREEN.OPERATION_INFO);
        }}
      />
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  buttonMenu: {
    flex: 1,
    width: 40,
    marginTop: 5,
    marginBottom: 5,
  },
  buttonMenuHighlight: {
    borderWidth: 3,
    borderColor: 'green',
  },
});
