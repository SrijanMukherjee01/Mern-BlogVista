import React, { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({}); // Corrected variable name to setUserInfo
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}> {/* Corrected variable name to setUserInfo */}
      {children}
    </UserContext.Provider>
  );
}
