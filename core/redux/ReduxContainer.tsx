import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from './Store';

type Props = {
  children: any;
};

export const ReduxContainer: FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
