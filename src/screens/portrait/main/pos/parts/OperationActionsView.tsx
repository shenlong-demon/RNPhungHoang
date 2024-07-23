import {FC, memo} from 'react';
import View from '@core/components/viewbase/View';
import {StyleSheet} from 'react-native';
import Button from '@core/components/buttonbase/Button';
import {useOperationContext, useOperationFacade} from '@src/business';
import {EscPos} from '@tillpos/xml-escpos-helper';
import TcpSocket from 'react-native-tcp-socket';
import Socket from 'react-native-tcp-socket/lib/types/Socket';
import {Logger} from '@core/common';
import {TcpClientSocket} from '@core/system';

type Props = {};
export const OperationActionsView: FC<Props> = memo(({}: Props) => {
  const {receipt} = useOperationFacade();
  const {selectedBooking} = useOperationContext();
  const doReceipt = async (): Promise<void> => {
    const PRINTERS = {device_name: 'Epson', host: '172.17.1.172', port: 9100};

    const template = ` 
      <?xml version="1.0" encoding="UTF-8"?>
      <document>
          <bold>
            <text size="1:0">Chao </text-line>
          </bold>
        <align mode="right">
          <bold>
            <text-line size="1:0">Cac ban</text-line>
          </bold>
        </align>
      
        <align mode="center">
          <text-line size="0:0">12345678901234567890123456789012345678901234567890</text-line>
        </align>
        
        <line-feed />
        
        <paper-cut />
      </document>`;

    const input = {};

    const array: number[] = EscPos.getBufferFromTemplate(template, input);
    const buffer = Buffer.from(array);
    const socket: TcpClientSocket = await TcpClientSocket.connect({
      host: PRINTERS.host,
      port: PRINTERS.port,
    });
    socket.write(buffer);
    socket.close();
  };
  return (
    <View.V style={styles.container}>
      {!!selectedBooking ? (
        <>
          <Button.B label={`Set note for ${selectedBooking.name}`} />
          <Button.B label={`Cancel ${selectedBooking.name}`} />
        </>
      ) : null}

      <Button.B label={'Receipt'} onPress={doReceipt} />
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {},
});
