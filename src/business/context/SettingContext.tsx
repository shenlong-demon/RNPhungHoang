import {Setting} from '@src/business';
import React, {FC, useContext, useState} from 'react';

export type SettingContextResult = {
  setting: Setting | null;
  setSetting: (setting: Setting) => void;
};

export const useSettingContextFacade = (): SettingContextResult => {
  const [setting, setSetting] = useState<Setting | null>(null);

  return {
    setting,
    setSetting,
  };
};

const DefaultSettingContextResult: SettingContextResult = {
  setting: null,
  setSetting: (_setting: Setting): void => {},
};

const SettingContext = React.createContext<SettingContextResult>(
  DefaultSettingContextResult,
);

export const useSettingContext = () => useContext(SettingContext);
type Props = {
  children: React.ReactNode;
};
export const SettingContextProvider: FC<Props> = ({children}) => {
  const facade = useSettingContextFacade();
  return (
    <SettingContext.Provider value={facade}>{children}</SettingContext.Provider>
  );
};
