import * as React from "react";
import Head from "next/head";
import { Button, Layout } from "../components";

const ADMIN_PASSWORD = "hack_in";
const DEPLOY_HOOK =
  "https://api.vercel.com/v1/integrations/deploy/prj_mpmMsTfC3Z7RdGJDKaJ4HNDcvJu2/dPyynr1IF6";

const containerStyle = {
  margin: "5rem auto",
  width: 320,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  textAlign: "center",
};

const adminReducer = (state, action) => {
  switch (action.type) {
    case "AUTHENTICATED": {
      return { ...state, authenticated: true };
    }
    case "BUILD_STARTED": {
      return { ...state, build: { isTriggering: true } };
    }
    case "BUILD_COMPLETE": {
      return {
        ...state,
        build: { isTriggering: false, message: action.message },
      };
    }
    default: {
      console.error("Unknown action type", action.type);
      return state;
    }
  }
};

const INITIAL_STATE = {
  authenticated: false,
  build: { isTriggering: false },
};

const AdminPage = () => {
  const [state, dispatch] = React.useReducer(adminReducer, INITIAL_STATE);

  const onTriggerClick = async () => {
    dispatch({ type: "BUILD_STARTED" });
    await fetch(DEPLOY_HOOK, { method: "POST" });
    dispatch({
      type: "BUILD_COMPLETE",
      message: "Build has been triggered! This will take 15-20 minutes.",
    });
  };

  if (state.authenticated) {
    return (
      <Layout>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <div style={containerStyle}>
          <p>You're in the mainframe!</p>
          {!!state.build.message ? (
            <p style={{ color: "var(--primary)" }}>{state.build.message}</p>
          ) : (
            <Button
              onClick={onTriggerClick}
              isSubmitting={state.build.isTriggering}
            >
              Trigger Build
            </Button>
          )}
          <a
            href={"/api/fileUpload/start?authenticated=true"}
            target={"_blank"}
          >
            Relink Dropbox
          </a>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <form
        style={containerStyle}
        onSubmit={(event) => {
          event.preventDefault();
          if (event.target.password.value === ADMIN_PASSWORD) {
            dispatch({ type: "AUTHENTICATED" });
          }
        }}
      >
        <input type="password" name="password" placeholder="password..." />
        <Button type="submit">Authenticate</Button>
      </form>
    </Layout>
  );
};

export default AdminPage;
