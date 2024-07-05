import {FC, memo} from 'react';
import {Modal, ModalProps, StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';

type Props = ModalProps & {};
export const Popup: FC<Props> = memo(({visible, children}: Props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View.V style={styles.container}>{children}</View.V>
    </Modal>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
