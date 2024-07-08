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
  GET_PRODUCTS_BY() {
    return `${ENV.HOST}/product/filter`;
  },
  CREATE_PRODUCT() {
    return `${ENV.HOST}/product/create`;
  },
  UPDATE_PRODUCT(id: number) {
    return `${ENV.HOST}/product/update/${id}`;
  },
  CREATE_OPERATION() {
    return `${ENV.HOST}/operation/create`;
  },
  GET_OPERATION(offset: number) {
    return `${ENV.HOST}/operation/list/${offset}`;
  },
};
export {API_URL};
