import React, { createContext, useContext, useState } from "react";

//Create the Context
const AuthContext = createContext(null);

//Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

//Auth Provider Component
export const AuthProvider = ({ children }) => {
  //Simulate user login state. Set to true to bypass login for testing.
  const [user, setUser] = useState(null);

  //Simulate login/logout functions
  const login = () => {
    //In a real app, this would involve API calls and more complex logic
    setUser({ id: 1, username: "testUser" });
    console.log("User Logged In");
  };

  const logout = () => {
    setUser(null);
    console.log("User Logged Out");
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
