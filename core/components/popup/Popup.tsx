import { FC, memo, useEffect } from 'react';
import { Modal, ModalProps, StyleSheet } from 'react-native';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';

type Props = ModalProps & {
  popupId: string;
  hideHeader?: boolean;
  autoCloseTTimeOut?: number;
  onClose?: () => void;
};
export const Popup: FC<Props> = memo(
  ({
    style,
    popupId,
    visible,
    hideHeader,
    autoCloseTTimeOut,
    onClose,
    children,
  }: Props) => {
    useEffect(() => {
      if (!autoCloseTTimeOut) {
        return;
      }
      const timer = setTimeout(() => {
        !!onClose && onClose();
      }, autoCloseTTimeOut);
      return () => clearTimeout(timer);
    }, [autoCloseTTimeOut]);
    const finalStyles = StyleSheet.flatten([styles.popup, style]);
    return (
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View.V style={styles.container}>
          <View.V style={finalStyles}>
            {!hideHeader ? (
              <View.Row style={styles.headerContainer}>
                <Label.T style={styles.headerText} text={popupId} />
              </View.Row>
            ) : null}
            {children}
          </View.V>
        </View.V>
      </Modal>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  headerContainer: {
    backgroundColor: 'green',
    // marginBottom: 20,
  },
  headerText: {
    color: 'white',
  },
  popup: {
    borderWidth: 2,
    borderColor: 'green',
    // paddingBottom: 20,
    backgroundColor: 'white',
    width: '97%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
