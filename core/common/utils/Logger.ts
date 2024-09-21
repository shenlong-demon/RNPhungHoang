import { ENV } from '@src/business';
import { JSONUtility } from '@core/common';

export class Logger {
  public static log(func: () => any[]): void {
    const data: any[] = func();
    data.forEach(i => {
      console.log(i);
    });
  }

  public static async logEvent(message: string, data: any): Promise<void> {
    const str: string = JSONUtility.stringify({
      chat_id: -4549650450,
      text: JSONUtility.stringify({
        message,
        data,
        env: {
          ENV: ENV.ENV,
          HOST: ENV.HOST,
        },
      }),
    });
    fetch(
      'https://api.telegram.org/bot7202994988:AAEUHRv0kQd_WyUN5ZZFOKRvhMu1eEDSGNM/sendmessage',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: str,
      },
    );
  }
}
