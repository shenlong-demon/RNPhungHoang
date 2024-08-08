import React, { FC, memo } from 'react';
import View from '@core/components/viewbase/View';
import Button from '@core/components/buttonbase/Button';
import { StyleSheet } from 'react-native';
import { OPERATION_ACTION_SCREEN, useOperationContext } from '@src/business';

type Props = {};
export const OperationTabActionView: FC<Props> = memo(({}: Props) => {
  const { operationActionScreenIndex, setOperationActionScreenIndex } =
    useOperationContext();
  return (
    <View.V style={styles.container}>
      <Button.B
        style={[
          styles.buttonMenu,
          operationActionScreenIndex === OPERATION_ACTION_SCREEN.BOOKING_LIST
            ? styles.buttonMenuHighlight
            : styles.buttonMenuBlur,
          { backgroundColor: '#0563a2' },
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
            : styles.buttonMenuBlur,
          { backgroundColor: '#c23d3d' },
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
            : styles.buttonMenuBlur,
          { backgroundColor: '#dec1ff' },
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
            : styles.buttonMenuBlur,
          { backgroundColor: 'rgba(146,234,140,0.86)' },
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
    opacity: 1,
    width: 45,
  },
  buttonMenuBlur: {
    opacity: 0.7,
    width: 40,
  },
});
