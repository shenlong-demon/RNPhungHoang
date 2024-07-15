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
  GET_OPERATIONS(offset: number) {
    return `${ENV.HOST}/operation/list/${offset}`;
  },
  GET_OPERATION(id: number) {
    return `${ENV.HOST}/operation/detail/${id}`;
  },
  CREATE_CUSTOMER() {
    return `${ENV.HOST}/customer/create`;
  },
  UPDATE_CUSTOMER(id: number) {
    return `${ENV.HOST}/customer/update/${id}`;
  },
  GET_ALL_DATA: (): string => {
    return `${ENV.HOST}/data/all`;
  },
};
export {API_URL};
