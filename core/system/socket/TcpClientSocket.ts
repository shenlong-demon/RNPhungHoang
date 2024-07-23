import Socket from 'react-native-tcp-socket/lib/types/Socket';
import {Logger} from '@core/common';
import TcpSocket from 'react-native-tcp-socket';
import {Buffer} from 'buffer';

export type Options = {
  host: string;
  port: number;
};
export class TcpClientSocket {
  private socket: Socket | null = null;

  constructor(socket: Socket | null) {
    this.socket = socket;
  }
  public static async connect(option: Options): Promise<TcpClientSocket> {
    const promise = new Promise<Socket | null>(resolve => {
      const sc: Socket | null = TcpSocket.createConnection(
        {
          host: option.host,
          port: option.port,
        },
        () => {
          Logger.log(() => [`TcpClientSocket connect`, option]);
          resolve(sc);
        },
      );
      if (!!sc) {
        sc.on('data', function (data) {
          Logger.log(() => [`TcpClientSocket received data`, data]);
        });

        sc.on('error', function (error) {
          Logger.log(() => [`TcpClientSocket error`, error]);
        });

        sc.on('close', function () {
          Logger.log(() => [`TcpClientSocket close`]);
        });
      }
    });
    const sc: Socket | null = await promise;
    return new TcpClientSocket(sc);
  }
  public write(buffer: Buffer): boolean {
    const res: boolean = !!this.socket && this.socket.write(buffer);
    Logger.log(() => [
      `TcpClientSocket write write buffer ${res ? 'Successfully' : 'ERROR'}`,
      this.socket,
    ]);
    return res;
  }
  public close(): void {
    !!this.socket && this.socket.destroy();
    this.socket = null;
    Logger.log(() => [`TcpClientSocket destroy`]);
  }
}
