import React, { useContext } from 'react';
import { Dto, Logger } from '@core/common';
import { useNavigation } from '@core/navigation';
import { ENV, useAuthContext, usePopupContext } from '@src/business';
import { Route } from '@src/screens/portrait/Route';
import BaseFacade from '@core/common/models/BaseFacade';

export type DtoHandlerContextResult = {
  dtoHandle: (dto: Dto<any | null>) => Promise<boolean>;
};

const useDtoHandlerContextFacade = (): DtoHandlerContextResult => {
  const { replace, navigate } = useNavigation();
  const { showToast } = usePopupContext();
  const { removeUserAndClear } = useAuthContext();

  const dtoHandle = async (dto: Dto<any | null>): Promise<boolean> => {
    if (dto.next()) {
      if (dto.isWarning()) {
        showToast(dto.message || 'Warning !!!');
      }
    } else {
      const code: number = dto.getCode();
      Logger.log(() => [
        `useDtoHandlerContextFacade dtoHandle code ${code} isError ${dto.isError()}`,
        dto,
      ]);

      if (code === 401) {
        Logger.log(() => [
          `useDtoHandlerContextFacade dtoHandle code ${code} move to (Route.LOGIN)`,
        ]);
        await removeUserAndClear();
        showToast(`Your login is expired. Please try login again !`);
        navigate(Route.LOGIN);
      } else {
        showToast(dto.message || 'Something went wrong. Please try again !');
        Logger.logEvent(`===== ${ENV.ENV} - ${code} =====`, {
          dto,
        });
      }
    }

    return dto.next();
  };

  const res: DtoHandlerContextResult = { dtoHandle };
  BaseFacade.defaultHandlerFunc = () => res;

  return res;
};

const DefaultDtoHandlerContextResult: DtoHandlerContextResult = {
  dtoHandle: async (_dto: Dto<any | null>): Promise<boolean> => {
    return false;
  },
};

const DtoHandlerContext = React.createContext<DtoHandlerContextResult>(
  DefaultDtoHandlerContextResult,
);

export const useDtoHandlerContext = () => useContext(DtoHandlerContext);

type Props = {
  children: React.ReactNode;
};
export const DtoHandlerContextProvider = ({ children }: Props) => {
  const facade = useDtoHandlerContextFacade();
  return (
    <DtoHandlerContext.Provider value={facade}>
      {children}
    </DtoHandlerContext.Provider>
  );
};
