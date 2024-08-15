import React, { Children, FC, useContext, useMemo, useState } from 'react';
import { Popup } from '@core/components/popup/Popup';
import View from '@core/components/viewbase/View';
import Label from '@core/components/labelbase/Label';
import Button from '@core/components/buttonbase/Button';

type PopupType = {
  id: string;
  popup: any;
};
export type PopupContextResult = {
  closeAllPopups: () => void;
  popups: any[];
  openPopup: (popupId: string, contentView: any) => void;
  showToast: (message: string) => void;
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
  const showToast = (message: string): void => {
    const popupId: string = 'Info';
    const newPopup = (
      <Popup
        popupId={popupId}
        style={{
          position: 'absolute',
          bottom: 10,
        }}
        transparent={true}
        visible={true}
        hideHeader={true}
        autoCloseTTimeOut={8000}
        onClose={() => {
          closePopup(popupId);
        }}>
        <View.V
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'green',
            flex: 1,
            width: '100%',
          }}>
          <Label.T text={message} style={{ flex: 1, color: 'white' }} />
          <Button.B
            label={'OK'}
            style={{ width: 50, minWidth: 50 }}
            textStyle={{ color: 'white' }}
            onPress={() => {
              closePopup(popupId);
            }}
          />
        </View.V>
      </Popup>
    );
    setPopups([
      ...popups.filter((popup: PopupType): boolean => {
        return popup.id !== popupId;
      }),
      { id: popupId, popup: newPopup },
    ]);
  };

  const createPopup = (
    popupId: string,
    contentView: any,
    hideHeader?: boolean,
  ): void => {
    const newPopup = (
      <Popup
        popupId={popupId}
        transparent={true}
        visible={true}
        hideHeader={hideHeader}>
        {contentView}
      </Popup>
    );
    setPopups([
      ...popups.filter((popup: PopupType): boolean => {
        return popup.id !== popupId;
      }),
      { id: popupId, popup: newPopup },
    ]);
  };

  const openPopup = (popupId: string, contentView: any): void => {
    return createPopup(popupId, contentView, false);
  };

  const popupView = useMemo((): any[] => {
    return popups.map((popup: PopupType): any => {
      return popup.popup;
    });
  }, [popups]);

  return {
    openPopup,
    closePopup,
    closeAllPopups,
    popups: popupView,
    showToast,
  };
};

const DefaultPopupContextResult: PopupContextResult = {
  closeAllPopups: (): void => {},
  openPopup: (_popupId: string, _contentView: any): void => {},
  closePopup: (_popupId: string): void => {},
  showToast: (_message: string): void => {},
  popups: [],
};

const PopupContext = React.createContext<PopupContextResult>(
  DefaultPopupContextResult,
);

export const usePopupContext = () => useContext(PopupContext);

type Props = {
  children: React.ReactNode;
};
export const PopupContextProvider: FC<Props> = ({ children }) => {
  const facade = usePopupContextFacade();
  // @ts-ignore
  const allChildren: any[] = Children.map(children, child => child).concat(
    facade.popups,
  );

  return (
    <PopupContext.Provider value={facade}>{allChildren}</PopupContext.Provider>
  );
};
