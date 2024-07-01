import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import {BaseService, CONSTANTS, Dto, FileUtils, Logger} from '@core/common';
import {File} from '@core/models';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {Upload} from '@aws-sdk/lib-storage';
import {Buffer} from 'buffer';

export class UpdateFileService extends BaseService<UpdateFileService> {
  private client: S3Client;
  private readonly BUCKET: string = 'phunghoang';
  private readonly FOLDER: string = 'stg';
  constructor() {
    super();
    const config = {
      region: 'ap-southeast-2',
      credentials: {

      },
    };
    this.client = new S3Client(config);
  }

  public static shared(): UpdateFileService {
    return this.Instance(UpdateFileService);
  }

  async uploadImage(imageFile?: File): Promise<Dto<string>> {
    if (!!imageFile) {
      const fileData: Buffer = await FileUtils.readBufferFromPath(
        imageFile.uri,
      );
      const upload = new Upload({
        client: this.client,
        params: {
          Bucket: 'phunghoang',
          Key: `${this.FOLDER}/` + imageFile.name,
          Body: fileData,
        },
      });
      const result = await upload.done();

      Logger.log(() => [`UpdateFileService uploadImage `, result]);
    }
    return this.successDto<string>(CONSTANTS.STR_EMPTY);
  }
}
