import * as React from "react";

import { useRouter } from "next/router";
import auth from "pages/api/fileUpload/auth";

const AUTH_KEY = `__auth${new Date().toISOString().substring(0, 10)}`;

const isAuthenticated = () =>
  typeof window === "object" &&
  window.sessionStorage?.getItem(AUTH_KEY) === "YES";

const authReducer = (state, action) => {
  console.log("authReducer", state, action);

  switch (action.type) {
    case "AUTHENTICATE": {
      try {
        window?.sessionStorage?.setItem(AUTH_KEY, "YES");
      } catch (sessionError) {
        console.error("Error writing to sessionStorage", sessionError);
      }

      return { ...state, authenticated: "YES" };
    }
    case "CHECK_STORAGE": {
      try {
        return { ...state, authenticated: isAuthenticated() ? "YES" : "NO" };
      } catch (sessionError) {
        console.error("Error reading from sessionStorage", sessionError);
        return state;
      }
    }
    case "LOGOUT": {
      try {
        window?.sessionStorage?.removeItem(AUTH_KEY);
      } catch (sessionError) {
        console.error("Error writing to sessionStorage", sessionError);
      }

      return { ...state, authenticated: "NO" };
    }
    default: {
      console.error("Unknown action type", action.type);
      return state;
    }
  }
};

const INITIAL_STATE = {
  authenticated: "UNKNOWN",
};

export const useAdminAuth = () => {
  const [authState, dispatch] = React.useReducer(authReducer, INITIAL_STATE);
  const router = useRouter();

  React.useEffect(() => {
    switch (authState.authenticated) {
      case "YES": {
        console.log("logged in");
        if (router.asPath.includes("__admin/login")) {
          console.log("- to home");
          router.replace("/__admin");
        }
        break;
      }
      case "NO": {
        console.log("not logged in");
        if (!router.asPath.includes("__admin/login")) {
          console.log("- to login");
          router.replace("/__admin/login");
          break;
        }
      }
      case "UNKNOWN": {
        dispatch({ type: "CHECK_STORAGE" });
        break;
      }
    }
    if (authState.authenticated === "UNKNOWN") {
    }
  }, [authState.authenticated, router]);

  return [authState, dispatch];
};
