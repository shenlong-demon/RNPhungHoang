import {STATUS} from '@src/business';
import {BaseFilterRequest} from '@src/business/model/request/BaseFilterRequest';

export type CustomerFilterRequest = BaseFilterRequest & {
  searchText: string;
  status: STATUS | null;
};
