import { User } from '@src/business';
import React, { useContext, useEffect, useState } from 'react';
import { AuthFacade } from '@src/business/facade';
import { DateTimeUtils, Logger } from '@core/common';

export type AuthContextResult = {
  init: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  removeUserAndClear: () => Promise<void>;
  logout: () => Promise<void>;
};

const DefaultAuthContextResult: AuthContextResult = {
  user: null,
  setUser: (_user: User | null): void => {},
  init: false,
  removeUserAndClear: async (): Promise<void> => {},
  logout: async (): Promise<void> => {},
};

const useAuthContextFacade = (): AuthContextResult => {
  useEffect(() => {
    Logger.log(() => [`useAuthContextFacade create at ${DateTimeUtils.now()}`]);
  }, []);
  const [user, setUser] = useState<User | null>(null);
  const [init, setInit] = useState<boolean>(false);

  const facade: AuthFacade = AuthFacade.shared();
  useEffect(() => {
    loadUserInCache();
  }, []);

  const loadUserInCache = async (): Promise<void> => {
    const user: User | null = await facade.isLoggedIn();
    Logger.log(() => [
      `useAuthContextFacade loadUserInCache user ${!!user}`,
      user,
    ]);

    setUser(user);
    setInit(true);
  };
  const removeUserAndClear = async (): Promise<void> => {
    Logger.log(() => [`useAuthContextFacade removeUser`]);
    await facade.removeUserAndClearData();
    setUser(null);
  };
  const logout = async (): Promise<void> => {
    Logger.log(() => [`useAuthContextFacade logout`]);
    await facade.logout();
    setUser(null);
  };

  return {
    user,
    setUser,
    init,
    removeUserAndClear,
    logout,
  };
};

const AuthContext = React.createContext<AuthContextResult>(
  DefaultAuthContextResult,
);

type Props = {
  children: React.ReactNode;
};
export const AuthContextProvider = ({ children }: Props) => {
  const facade = useAuthContextFacade();
  return <AuthContext.Provider value={facade}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
