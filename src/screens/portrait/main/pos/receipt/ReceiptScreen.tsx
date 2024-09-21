import { FC, memo } from 'react';
import View from '@core/components/viewbase/View';
import { StyleSheet } from 'react-native';
import { FlatList } from '@core/components';
import { Bill, Booking, useOperationContext } from '@src/business';
import { BookingItemView } from '@src/screens/portrait/main/pos/parts';
import Label from '@core/components/labelbase/Label';
import { Dto } from '@core/common';
import { useNavigation } from '@core/navigation';
import Form from '@core/components/formbase/Form';

type Props = {};
export const ReceiptScreen: FC<Props> = memo(({}: Props) => {
  const { operation, total, receipt } = useOperationContext();
  const { popToTop } = useNavigation();
  const renderItem = (data: { item: Booking; index: number }): any => {
    return (
      <BookingItemView
        key={`${data.item.id}`}
        item={data.item}
        index={data.index}
      />
    );
  };
  const handleSubmit = async (_data: any): Promise<void> => {
    const dto: Dto<Bill | null> = await receipt();
    if (dto.next()) {
      popToTop();
    }
  };
  return (
    <Form.View onSubmit={handleSubmit} style={styles.container}>
      <View.V style={styles.infoView}>
        <Label.T style={styles.titleName} text={`Operation Name`} />
        <Label.T style={styles.name} text={`${operation?.name}`} />
        {operation?.discount ? (
          <>
            <Label.T style={styles.titleName} text={`Discount`} />
            <Label.Money style={styles.discount} value={operation?.discount} />
          </>
        ) : null}
        <Label.T style={styles.titleName} text={`Total`} />
        <Label.Money style={styles.total} value={total} />
      </View.V>
      <FlatList.L
        style={styles.list}
        data={operation?.bookings || []}
        renderItem={renderItem}
        keyExtractor={(item: Booking, index: number) => `${item.id}_${index}`}
      />

      <Form.SubmitButton
        textStyle={styles.receiptButtonText}
        style={styles.receiptButton}
        label={'Receipt'}
      />
    </Form.View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: 'green',
    marginBottom: 30,
  },
  receiptButton: {
    backgroundColor: 'green',
    marginBottom: 10,
    width: '70%',
  },
  receiptButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  titleName: {
    fontWeight: 'bold',
    color: 'green',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  discount: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  total: {
    fontWeight: 'bold',
  },
  infoView: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
});
