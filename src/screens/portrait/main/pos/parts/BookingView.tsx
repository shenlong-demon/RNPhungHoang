import {FC, memo} from 'react';
import {Booking} from '@src/business';
import View from '@core/components/viewbase/View';

type Props = {
  item: Booking;
  index: number;
};
export const BookingView: FC<Props> = memo(({item, index}: Props) => {
  return <View.V></View.V>;
});
