import * as React from "react";

import { usePathname, useRouter } from "next/navigation";

const AUTH_KEY = `__auth${new Date().toISOString().substring(0, 10)}`;

const isAuthenticated = () =>
  typeof window === "object" &&
  window.sessionStorage?.getItem(AUTH_KEY) === "YES";

const authReducer = (state, action) => {
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
  const pathname = usePathname();

  React.useEffect(() => {
    switch (authState.authenticated) {
      case "YES": {
        if (pathname.includes("admin/login")) {
          console.log("- to home");
          router.replace("/admin");
        }
        break;
      }
      case "NO": {
        if (!pathname.includes("admin/login")) {
          console.log("- to login");
          router.replace("/admin/login");
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
