import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import {BaseService, CONSTANTS, Dto, FileUtils, Logger} from '@core/common';
import {File} from '@core/models';
import {
  CompleteMultipartUploadCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import {Upload} from '@aws-sdk/lib-storage';
import {Buffer} from 'buffer';
import {ENV} from '@src/business';

export class UpdateFileService extends BaseService<UpdateFileService> {
  private client: S3Client;
  private readonly BUCKET: string = ENV.AWS_S3_BUCKET;
  private readonly FOLDER: string = ENV.ENV;
  constructor() {
    super();
    const config = {
      region: ENV.AWS_S3_REGION,
      credentials: {
        accessKeyId: ENV.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: ENV.AWS_S3_SECRET_ACCESS_KEY,
      },
    };
    this.client = new S3Client(config);
  }

  public static shared(): UpdateFileService {
    return this.Instance(UpdateFileService);
  }

  async uploadImage(imageFile?: File): Promise<Dto<string>> {
    if (!!imageFile?.name) {
      const fileData: Buffer = await FileUtils.readBufferFromPath(
        imageFile.uri,
      );
      const upload = new Upload({
        client: this.client,
        params: {
          Bucket: this.BUCKET,
          Key: `${this.FOLDER}/` + imageFile.name,
          Body: fileData,
        },
      });
      const result: CompleteMultipartUploadCommandOutput = await upload.done();

      Logger.log(() => [`UpdateFileService uploadImage `, result]);
    }
    return this.successDto<string>(CONSTANTS.STR_EMPTY);
  }
}
