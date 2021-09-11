import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import UserAPI from "../api/UserAPI";
import CategoryAPI from "../api/CategoryAPI";
import BlogAPI from "../api/BlogAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    const res = await axios.get(
      "https://code-blogs-tech.herokuapp.com/user/refresh_token"
    );
    setToken(res.data.accessToken);
  };

  useEffect(() => {
    refreshToken();
  }, []);

  const state = {
    token: [token, setToken],
    userAPI: UserAPI(token),
    categoryAPI: CategoryAPI(),
    blogAPI: BlogAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
