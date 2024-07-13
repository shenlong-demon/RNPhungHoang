import React, {FC, memo, useCallback, useMemo} from 'react';
import {STATUS} from '@src/business';
import View from '@core/components/viewbase/View';
import Form from '@core/components/formbase/Form';
import Label from '@core/components/labelbase/Label';

type Props = {
  name: string;
  defaultValue?: number;
};

type Status = {
  id: STATUS;
  label: string;
  color: any;
};

export const FormStatusDropDown: FC<Props> = memo((props: Props) => {
  const statuses: Status[] = useMemo(
    () => [
      {
        id: STATUS.ACTIVE,
        label: 'Active',
        color: '#DEFFDCF2',
      },
      {
        id: STATUS.INACTIVE,
        label: 'Inactive',
        color: '#FFD3D3F2',
      },
    ],
    [],
  );

  const defaultValue = useMemo(() => {
    return (
      statuses.find((status: Status): boolean => {
        return status.id === props.defaultValue;
      }) || null
    );
  }, [props.defaultValue]);

  const renderItem = useCallback((status: Status) => {
    return (
      <View.Row style={{backgroundColor: status.color}}>
        <Label.T text={status?.label || ''} />
      </View.Row>
    );
  }, []);

  return (
    <View.V style={{flex: 1}}>
      <Form.DropDown
        placeholder={'Select status'}
        name={props.name}
        data={statuses}
        rules={{required: 'Status is required!'}}
        labelField={'label'}
        valueField={'id'}
        label={'Status'}
        renderItem={renderItem}
        defaultValue={defaultValue}
        value={defaultValue}
        selectedProperty={'id'}
      />
    </View.V>
  );
});
