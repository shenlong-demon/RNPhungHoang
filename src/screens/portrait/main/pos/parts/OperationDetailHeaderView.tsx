import React, {FC} from 'react';
import {useOperationContext} from '@src/business';
import View from '@core/components/viewbase/View';
import Button from '@core/components/buttonbase/Button';
import Label from '@core/components/labelbase/Label';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@core/navigation';

type Props = {};
export const OperationDetailHeaderView: FC<Props> = ({}: Props) => {
  const {operation} = useOperationContext();
  const {goBack} = useNavigation();
  return (
    <View.Row style={styles.container}>
      <Label.T style={styles.name} text={`${operation?.name}`} />
      <View.Row style={styles.float}>
        <Button.B
          textStyle={{color: 'white'}}
          style={styles.backButton}
          label={'Back'}
          onPress={goBack}
        />
        <Label.T style={styles.total} text={`10000000`} />
      </View.Row>
    </View.Row>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  name: {color: 'white', fontWeight: 'bold'},
  total: {color: 'white', fontWeight: 'bold'},
  backButton: {width: 100, minWidth: 100},
  float: {
    position: 'absolute',
    justifyContent: 'space-between',
  },
});
