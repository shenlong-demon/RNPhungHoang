declare module 'react-native-config' {
  export interface NativeConfig {
    HOST?: string;
    ENV?: string;
    AWS_S3_BUCKET?: string;
    AWS_S3_REGION?: string;
    AWS_S3_ACCESS_KEY_ID?: string;
    AWS_S3_SECRET_ACCESS_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
