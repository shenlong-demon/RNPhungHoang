import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import View from '@core/components/viewbase/View';
import {DateTimePicker} from '@core/components';
import {CONSTANTS, Dto, Logger} from '@core/common';
import {
  Customer,
  Operation,
  useOperationContext,
  useOperationFacade,
} from '@src/business';
import Label from '@core/components/labelbase/Label';
import Button from '@core/components/buttonbase/Button';
import Image from '@core/components/imagebase/Image';
import {Route} from '@src/screens/portrait/Route';
import {useNavigation} from '@core/navigation';
import {CustomerListNavigationParam} from '@src/screens/portrait/main/customer/CustomerListScreen';

type Props = {};
export const OperationInfoView: FC<Props> = memo(({}: Props) => {
  const facade = useOperationFacade();
  const {operation, setEstimation, getOperationDetail} = useOperationContext();
  const {navigate, goBack} = useNavigation();
  const onEstimationChanged = (newDate: number): void => {
    Logger.log(() => [`OperationInfoView estimation changed `, newDate]);
    setEstimation(newDate);
  };
  const doReceipt = async (): Promise<void> => {
    const dto: Dto<Operation | null> = await getOperationDetail();
    if (dto.next()) {
      navigate(Route.RECEIPT);
    }
  };
  const assignCustomerToOperation = async (
    customer: Customer,
    fromSelected: boolean,
  ): Promise<void> => {
    const dto: Dto<Operation | null> = await facade.assignCustomer(customer);
    if (dto.next()) {
      goBack();
      if (!fromSelected) {
        goBack();
      }
    }
  };
  const assignCustomer = (): void => {
    navigate(Route.ASSIGN_CUSTOMER, {
      assignCustomerFunc: assignCustomerToOperation,
    } as CustomerListNavigationParam);
  };

  return (
    <View.V style={styles.container}>
      <View.V style={styles.content}>
        <View.V style={styles.customer}>
          <View.V style={styles.customerInfo} onPress={assignCustomer}>
            <Label.T
              style={{alignSelf: 'center', fontWeight: 'bold'}}
              text={`${operation?.customer?.name || 'Press  to assign'}`}
            />
            <Label.T
              style={{alignSelf: 'center', fontWeight: 'bold', color: 'green'}}
              text={`${
                operation?.customer?.total === 0 ? '0' : CONSTANTS.STR_EMPTY
              }`}
            />
          </View.V>
          <Image.I
            style={styles.customerImage}
            source={{uri: operation?.customer?.image || CONSTANTS.STR_EMPTY}}
          />
        </View.V>
        <View.Row style={styles.row}>
          <Label.T text={'Release Est'} />
          <DateTimePicker.DT
            defaultValue={operation?.estimation}
            style={styles.datetime}
            textStyle={styles.datetimeText}
            onChange={onEstimationChanged}
          />
        </View.Row>
      </View.V>
      <View.V style={styles.actionView}>
        <Button.B
          style={styles.buttonReceipt}
          textStyle={{color: 'white'}}
          label={'Receipt'}
          onPress={doReceipt}
        />
      </View.V>
    </View.V>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  content: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    alignContent: 'flex-start',
  },
  datetime: {
    backgroundColor: '#200ae7',
  },
  datetimeText: {
    color: 'white',
  },
  buttonReceipt: {
    marginBottom: 10,
    width: '70%',
    backgroundColor: 'green',
  },
  customer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    // backgroundColor: 'green',
  },
  customerImage: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'green',
  },
  customerInfo: {
    justifyContent: 'center',
    flex: 1,
  },
  actionView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
