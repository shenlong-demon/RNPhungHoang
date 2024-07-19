import {FC, memo} from 'react';
import {Modal, ModalProps, StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
import {usePopupContext} from '@src/business';

type Props = ModalProps & {popupId: string};
export const Popup: FC<Props> = memo(({popupId, visible, children}: Props) => {
  const {closePopup} = usePopupContext();
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View.V
        onPress={() => {
          closePopup(popupId);
        }}
        style={styles.container}>
        {children}
      </View.V>
    </Modal>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});
