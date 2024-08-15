import Config from 'react-native-config';
import { CONSTANTS } from '@core/common';

export class ENV {
  public static HOST: string = Config.HOST || CONSTANTS.STR_EMPTY;
  public static ENV: string = Config.ENV || CONSTANTS.STR_EMPTY;
  public static AWS_S3_BUCKET: string =
    Config.AWS_S3_BUCKET || CONSTANTS.STR_EMPTY;
  public static AWS_S3_REGION: string =
    Config.AWS_S3_REGION || CONSTANTS.STR_EMPTY;
  public static AWS_S3_ACCESS_KEY_ID: string =
    Config.AWS_S3_ACCESS_KEY_ID || CONSTANTS.STR_EMPTY;
  public static AWS_S3_SECRET_ACCESS_KEY: string =
    Config.AWS_S3_SECRET_ACCESS_KEY || CONSTANTS.STR_EMPTY;
}
