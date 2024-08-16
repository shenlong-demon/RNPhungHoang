import { Bill, BillIssue, Order } from '@src/business';
import { memo, useEffect, useState } from 'react';
import View from '@core/components/viewbase/View';
import { StyleSheet } from 'react-native';
import Button from '@core/components/buttonbase/Button';
import Label from '@core/components/labelbase/Label';
import { Logger } from '@core/common';
import { FlatList } from '@core/components';
import {
  BillIssueListItemView,
  OrderListItemView,
} from '@src/screens/portrait/main/bill/parts';

type Props = {
  bill: Bill;
  onClose: () => void;
};
export const BillInfoPopup = memo(({ bill, onClose }: Props) => {
  const [viewIndex, setViewIndex] = useState<number>(0);
  useEffect(() => {
    Logger.log(() => [`BillInfoPopup ${bill.name || 'No name'}`, bill]);
  }, []);

  const renderIssue = (data: { item: BillIssue; index: number }): any => {
    return (
      <BillIssueListItemView
        key={`${data.item.id}`}
        item={data.item}
        index={data.index}
      />
    );
  };
  const renderOrder = (data: { item: Order; index: number }): any => {
    return (
      <OrderListItemView
        key={`${data.item.id}`}
        item={data.item}
        index={data.index}
      />
    );
  };

  return (
    <View.V style={styles.container}>
      <View.V style={styles.infoView}>
        <Label.T style={styles.titleName} text={`Operation Name`} />
        <Label.T style={styles.name} text={`${bill?.name}`} />
        {bill?.discount ? (
          <>
            <Label.T style={styles.titleName} text={`Discount`} />
            <Label.Money style={styles.discount} value={bill?.discount} />
          </>
        ) : null}
        <Label.T style={styles.titleName} text={`Total`} />
        <Label.Money style={styles.total} value={bill.total} />
      </View.V>
      <View.V
        style={{
          flexDirection: 'row',
          width: '100%',
          flex: 1,
        }}>
        <View.V
          style={{
            justifyContent: 'center',
            marginRight: 5,
          }}>
          <View.V
            style={{ height: '35%', width: 45, backgroundColor: '#0563a2' }}
            onPress={() => setViewIndex(0)}
          />
          <View.V
            style={{ height: '35%', width: 45, backgroundColor: '#c23d3d' }}
            onPress={() => setViewIndex(1)}
          />
        </View.V>
        {viewIndex === 0 ? (
          <View.V
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: 'green',
            }}>
            <FlatList.L
              data={bill.orders}
              renderItem={renderOrder}
              keyExtractor={(item: Order, index: number) =>
                `${item.id}_${index}`
              }
              style={styles.list}
            />
          </View.V>
        ) : null}
        {viewIndex === 1 ? (
          <View.V
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: 'green',
            }}>
            <FlatList.L
              data={bill.issues}
              renderItem={renderIssue}
              keyExtractor={(item: BillIssue, index: number) =>
                `${item.id}_${index}`
              }
              style={styles.list}
            />
          </View.V>
        ) : null}
      </View.V>
      <Button.Cancel
        style={{ marginTop: 20, width: '50%', alignSelf: 'center' }}
        label={'Close'}
        onPress={onClose}
      />
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {
    height: '90%',
    // flex: 1,
    width: '100%',
    // justifyContent: 'center',
    // alignSelf: 'flex-start',
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
    marginBottom: 10,
  },
  titleName: {
    fontWeight: 'bold',
    color: 'green',
  },
  list: {
    flex: 1,
  },
});
