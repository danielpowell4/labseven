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

const AdminPage = () => {
  const [authenticated, setAuthenticated] = React.useState();
  const [isTriggering, setIsTriggering] = React.useState(false);
  const [message, setMessage] = React.useState("A message");

  const onTriggerClick = async () => {
    setIsTriggering(true);
    await fetch(DEPLOY_HOOK, { method: "POST" });
    setMessage("Build has been triggered! This will take 15-20 minutes.");
    setIsTriggering(false);
  };

  if (authenticated) {
    return (
      <Layout>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <div style={containerStyle}>
          <p>You're in the mainframe!</p>
          {!!message ? (
            <p style={{ color: "var(--primary)" }}>{message}</p>
          ) : (
            <Button onClick={onTriggerClick} isSubmitting={isTriggering}>
              Trigger Build
            </Button>
          )}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <form
        style={containerStyle}
        onSubmit={(event) => {
          event.preventDefault();
          if (event.target.password.value === ADMIN_PASSWORD) {
            setAuthenticated(true);
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
