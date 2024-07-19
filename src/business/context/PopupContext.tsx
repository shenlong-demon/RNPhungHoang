import React, {Children, FC, useContext, useMemo, useState} from 'react';
import {Popup} from '@core/components/popup/Popup';

type PopupType = {
  id: string;
  popup: any;
};
export type PopupContextResult = {
  closeAllPopups: () => void;
  popups: any[];
  openPopup: (popupId: string, contentView: any) => void;
  closePopup: (popupId: string) => void;
};

export const usePopupContextFacade = (): PopupContextResult => {
  const [popups, setPopups] = useState<PopupType[]>([]);
  const closeAllPopups = (): void => {
    setPopups([]);
  };
  const closePopup = (popupId: string): void => {
    setPopups([
      ...popups.filter((popup: PopupType): boolean => {
        return popup.id !== popupId;
      }),
    ]);
  };

  const openPopup = (popupId: string, contentView: any): void => {
    const newPopup = (
      <Popup popupId={popupId} transparent={true} visible={true}>
        {contentView}
      </Popup>
    );
    setPopups([
      ...popups.filter((popup: PopupType): boolean => {
        return popup.id !== popupId;
      }),
      {id: popupId, popup: newPopup},
    ]);
  };

  const popupView = useMemo((): any[] => {
    return popups.map((popup: PopupType): any => {
      return popup.popup;
    });
  }, [popups]);

  return {openPopup, closePopup, closeAllPopups, popups: popupView};
};

const DefaultPopupContextResult: PopupContextResult = {
  closeAllPopups: (): void => {},
  openPopup: (_popupId: string, _contentView: any): void => {},
  closePopup: (_popupId: string): void => {},
  popups: [],
};

const PopupContext = React.createContext<PopupContextResult>(
  DefaultPopupContextResult,
);

export const usePopupContext = () => useContext(PopupContext);

type Props = {
  children: React.ReactNode;
};
export const PopupContextProvider: FC<Props> = ({children}) => {
  const facade = usePopupContextFacade();
  // @ts-ignore
  const allChildren: any[] = Children.map(children, child => child).concat(
    facade.popups,
  );

  return (
    <PopupContext.Provider value={facade}>{allChildren}</PopupContext.Provider>
  );
};
