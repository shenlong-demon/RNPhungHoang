import { ENV } from '@src/business';

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
  GET_PRODUCTS_BY() {
    return `${ENV.HOST}/product/filter`;
  },
  CREATE_PRODUCT() {
    return `${ENV.HOST}/product/create`;
  },
  UPDATE_PRODUCT(id: string) {
    return `${ENV.HOST}/product/update/${id}`;
  },
};
export { API_URL };
