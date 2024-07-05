import {FC, memo} from 'react';
import {Modal, ModalProps} from 'react-native';
type Props = ModalProps & {};
export const Popup: FC<Props> = memo(({visible, children}: Props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      {children}
    </Modal>
  );
});
