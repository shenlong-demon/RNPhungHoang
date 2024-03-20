import {ENV} from '@src/business';

const API_URL = {
  LOGIN: (): string => {
    return `${ENV.HOST}/auth/login`;
  },
  GET_BRANDS: (): string => {
    return `${ENV.HOST}/brand`;
  },
  GET_GROUPS: (): string => {
    return `${ENV.HOST}/group`;
  },
};
export {API_URL};
