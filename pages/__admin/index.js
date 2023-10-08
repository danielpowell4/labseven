import * as React from "react";
import Head from "next/head";
import { Button, Layout, LinkButton, ThreeDotLoader } from "../../components";

const DEPLOY_HOOK =
  "https://jsonplaceholder.typicode.com/todos/1" ||
  "https://api.vercel.com/v1/integrations/deploy/prj_mpmMsTfC3Z7RdGJDKaJ4HNDcvJu2/dPyynr1IF6";

import styles from "./admin.module.css";
import { useAdminAuth } from "lib/auth";

const INITIAL_STATE = {
  build: { isTriggering: false, message: null },
};

const adminReducer = (state, action) => {
  switch (action.type) {
    case "BUILD_STARTED": {
      return { ...state, build: { isTriggering: true } };
    }
    case "BUILD_SUCCESS": {
      return {
        ...state,
        build: {
          isTriggering: false,
          message: action.message,
          color: "var(--primary)",
        },
      };
    }
    case "BUILD_ERROR": {
      return {
        ...state,
        build: {
          isTriggering: false,
          message: action.message,
          color: "var(--danger)",
        },
      };
    }
    default: {
      console.error("Unknown action type", action.type);
      return state;
    }
  }
};

const AdminHomePage = () => {
  const [state, dispatch] = React.useReducer(adminReducer, INITIAL_STATE);
  const [_auth, authDispatch] = useAdminAuth();

  const onTriggerClick = async () => {
    dispatch({ type: "BUILD_STARTED" });
    try {
      await fetch(DEPLOY_HOOK, { method: "POST" });
      dispatch({
        type: "BUILD_SUCCESS",
        message: "Build has been triggered! This will take 15-20 minutes.",
      });
    } catch (err) {
      dispatch({
        type: "BUILD_SUCCESS",
        message: `Error triggering build. Please try again later. Error: ${err.message}`,
      });
    }
  };

  const onLogoutClick = () => {
    authDispatch({ type: "LOGOUT" });
  };

  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={styles.adminContainer}>
        <p>You're in the mainframe!</p>
        {!!state.build.message ? (
          <p style={{ color: state.build.color }}>{state.build.message}</p>
        ) : (
          <Button
            onClick={onTriggerClick}
            isSubmitting={state.build.isTriggering}
          >
            Trigger Site Rebuild
          </Button>
        )}
        <LinkButton
          href={"/api/fileUpload/start?authenticated=true"}
          target={"_blank"}
        >
          Relink Dropbox
        </LinkButton>
        <Button onClick={onLogoutClick}>Logout</Button>
      </div>
    </Layout>
  );
};

const ClientSideAuth = (Component) => {
  const AuthenticatedComponent = () => {
    const [isClientSide, setIsClientSide] = React.useState(false);
    const [auth] = useAdminAuth();

    React.useEffect(() => {
      setIsClientSide(true);
    }, []);

    if (!isClientSide || auth.authenticated !== "YES") {
      return (
        <Layout>
          <Head>
            <meta name="robots" content="noindex" />
          </Head>
          <ThreeDotLoader />
        </Layout>
      );
    }

    return (
      <Layout>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <Component />
      </Layout>
    );
  };

  return AuthenticatedComponent;
};

export default ClientSideAuth(AdminHomePage);
