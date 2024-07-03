import RNFetchBlob from 'rn-fetch-blob';
import {Buffer} from 'buffer';

export class FileUtils {
  public static async readBufferFromPath(uriOrPath: string): Promise<Buffer> {
    const fileBuffer = await RNFetchBlob.fs.readFile(uriOrPath, 'base64');
    const fileData = Buffer.from(fileBuffer, 'base64');
    return fileData;
  }
  public static getFileExtension(path: string): string {
    return path.split('.').pop();
  }
}
