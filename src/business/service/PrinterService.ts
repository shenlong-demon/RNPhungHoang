import {Buffer} from 'buffer';
import {Bill} from '@src/business';

export class PrinterService {
  static async processReceipt(bill: Bill): Promise<string> {
    const firstPart: string = ` 
      <?xml version="1.0" encoding="UTF-8"?>
      <document>
        <align mode="center">
          <bold>
            <text-line size="1:0">Chao cac ban</text-line>
          </bold>
        </align>
        <line-feed />
        <align mode="left">
          <bold>
            <text size="1:0">Left</text-line>
          </bold>
        </align>
        <align mode="right">
          <bold>
            <text size="1:0">Right</text-line>
          </bold>
        </align>
        <align mode="center">
        <text-line size="0:0"> thank 33333</text-line>
        </align>
        
        <line-feed />
        
        <paper-cut />
      </document>`;
  }
}
