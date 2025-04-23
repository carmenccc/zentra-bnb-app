import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { CurrentUser } from "src/types/auth";

interface Props {
  children: ReactNode;
}

interface AuthContextType {
  currentUser: CurrentUser;
  updateUser: (currentUserResponse: CurrentUser) => void;
}

// 1. Create context
export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  updateUser: () => {},
});

// 2. Define provider (wrap this around components that need the data)
export const AuthContextProvider = ({ children }: Props) => {
  const storedUser = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );

  const updateUser = (data: CurrentUser) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create custom hook (Call this to consume the data)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be within an AuthContextProvider");
  }
  return context;
};
