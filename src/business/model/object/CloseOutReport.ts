import {BaseModel} from '@src/business/model/object/base_model';

export type CloseOutReport = BaseModel & {
  date: number;
  totalBill: number;
  totalProfit: number;
  numberOfBill: number;
  totalDiscount: number;
};
