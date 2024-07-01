import Config from 'react-native-config';

export class ENV {
  public static HOST: string = Config.HOST;
  public static ENV: string = Config.ENV;
  public static AWS_S3_BUCKET: string = Config.AWS_S3_BUCKET;
  public static AWS_S3_REGION: string = Config.AWS_S3_REGION;
  public static AWS_S3_ACCESS_KEY_ID: string = Config.AWS_S3_ACCESS_KEY_ID;
  public static AWS_S3_SECRET_ACCESS_KEY: string =
    Config.AWS_S3_SECRET_ACCESS_KEY;
}
