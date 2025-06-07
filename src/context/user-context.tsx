import { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface IUser {
  _id: string;
  email: string;
  role: "student" | "tutor" | "admin";
  // Add any other user fields here
}

export interface IUserContext {
  isAuth: boolean;
  user: IUser | null;
  setIsAuth: (auth: boolean) => void;
  setUser: (user: IUser | null) => void;
}

export const UserContext = createContext<IUserContext | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserContext.Provider value={{ isAuth, user, setIsAuth, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
