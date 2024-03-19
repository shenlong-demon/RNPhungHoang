import {Brand, Setting, useBrandFacade, User} from '@src/business';
import React, {useContext, useEffect, useState,} from 'react';
import {LoginFacade} from "@src/business/facade";
import {Logger} from "@core/common";

export type AuthContextResult = {
  user: User | null;
  setUser: ( user: User | null) => void;
};

export const useAuthContextFacade = (): AuthContextResult => {
  const [user, setUser] = useState<User | null>(null);
  const facade: LoginFacade = LoginFacade.shared();
  useEffect(() => {
    loadUserInCache();
  } , []);

  const loadUserInCache = async (): Promise<void> => {
    const user: User | null = await facade.isLoggedIn();
    Logger.log(() => [`useAuthContextFacade loadUserInCache user ${!!user}`, user]);

    setUser(user);
  };

  return {
    user,
    setUser
  };
};

const DefaultAuthContextResult: AuthContextResult = {
  user: null,
  setUser : (_user: User): void => {}
};

const AuthContext = React.createContext<AuthContextResult>(
  DefaultAuthContextResult,
);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({children}) => {
  const facade = useAuthContextFacade();
  return <AuthContext.Provider value={facade}>{children}</AuthContext.Provider>;
};
