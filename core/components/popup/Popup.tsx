import {FC, memo} from 'react';
import {Modal, ModalProps, StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';

type Props = ModalProps & {popupId: string};
export const Popup: FC<Props> = memo(({popupId, visible, children}: Props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View.V style={styles.container}>
        <View.Center style={styles.popup}>
          <View.Row style={styles.headerContainer}>
            <Label.T style={styles.headerText} text={popupId} />
          </View.Row>
          {children}
        </View.Center>
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
  headerContainer: {
    backgroundColor: 'green',
  },
  headerText: {
    color: 'white',
  },
  popup: {
    borderWidth: 2,
    borderColor: 'green',
    paddingBottom: 20,
    backgroundColor: 'white',
    width: '97%',
  },
});
