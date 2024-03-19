import {ENV} from '@src/business';

const API_URL = {
  LOGIN: (): string => {
    return `${ENV.HOST}/auth/login`;
  },
  GET_BRANDS: (): string => {
    return `${ENV.HOST}/brand`;
  },
};
export {API_URL};
