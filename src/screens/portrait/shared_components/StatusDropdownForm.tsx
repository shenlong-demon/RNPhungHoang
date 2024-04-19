import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { Form, Label, View } from '@core/components';
import { STATUS } from '@src/business';

type Props = {
  name: string;
  defaultValue?: number;
};

type Status = {
    id: STATUS;
    label: string;
    color: any;
};

const StatusDropdownForm: FC<Props> = (props: Props) => {
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
        []
    );

    const [selectedStatusValue, setStatusValue] = useState<number>(
        props.defaultValue !== undefined ? props.defaultValue : STATUS.ACTIVE
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
                <Label.T text={status?.label || ''}/>
            </View.Row>
        );
    }, []);

    return (
        <View.V style={{flex: 1}}>
            <Form.SingleDropdown
                placeholder={'Select status'}
                name={props.name}
                data={statuses}
                rules={{required: 'Status is required!'}}
                labelField={'label'}
                valueField={'id'}
                renderItem={renderItem}
                defaultValue={defaultValue}
                property={'id'}
            />
        </View.V>
    );
};
export default memo(StatusDropdownForm);
