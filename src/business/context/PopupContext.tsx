import React, {useContext, useState} from 'react';
import {Popup} from '@core/components/popup/Popup';

type PopupType = {
  id: number;
  contentView: any;
};
export type PopupContextResult = {
  closeAllPopups: () => void;
  popups: any[];
  openPopup: (popupId: number, contentView: any) => void;
  closePopup: (popupId: number) => void;
};

export const usePopupContextFacade = (): PopupContextResult => {
  const [popups, setPopups] = useState<PopupType[]>([]);
  const closeAllPopups = (): void => {
    setPopups([]);
  };
  const closePopup = (popupId: number): void => {
    setPopups([
      ...popups.filter((popup: PopupType): boolean => {
        return popup.id !== popupId;
      }),
    ]);
  };

  const openPopup = (popupId: number, contentView: any): void => {
    closePopup(popupId);
    const newPopup = <Popup visible={true}>{contentView}</Popup>;
    setPopups([...popups, {id: popupId, contentView: newPopup}]);
  };

  return {openPopup, closePopup, closeAllPopups, popups};
};

const DefaultPopupContextResult: PopupContextResult = {
  closeAllPopups: (): void => {},
  openPopup: (_popupId: number, _contentView: any): void => {},
  closePopup: (_popupId: number): void => {},
  popups: [],
};

const PopupContext = React.createContext<PopupContextResult>(
  DefaultPopupContextResult,
);

export const usePopupContext = () => useContext(PopupContext);

export const PopupContextProvider = ({children}) => {
  const facade = usePopupContextFacade();
  return (
    <PopupContext.Provider value={facade}>
      {children}
      {...facade.popups}
    </PopupContext.Provider>
  );
};
