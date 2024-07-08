import {BaseModel} from '@src/business/model/object/base_model';
import {Booking, Customer} from '@src/business';

export type Operation = BaseModel & {
  name?: string;
  phone?: string;
  note?: string;
  customer?: Customer;
  customerId?: number;
  bookings: Booking[];
  estimation?: Date | null;
};
