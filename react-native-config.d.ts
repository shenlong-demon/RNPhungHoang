declare module 'react-native-config' {
  export interface NativeConfig {
    HOST?: string;
    ENV?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
