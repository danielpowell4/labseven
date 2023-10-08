import * as React from "react";
import Head from "next/head";
import { Button, Layout } from "components";
import { useAdminAuth } from "lib/auth";

import styles from "./admin.module.css";

const ADMIN_PASSWORD = "hack_in";

const AdminLoginPage = () => {
  const [_authState, dispatch] = useAdminAuth();

  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <form
        className={styles.adminContainer}
        onSubmit={(event) => {
          event.preventDefault();

          if (event.target.password.value === ADMIN_PASSWORD) {
            dispatch({ type: "AUTHENTICATE" });
          }
        }}
      >
        <input type="password" name="password" placeholder="password..." />
        <Button type="submit">Authenticate</Button>
      </form>
    </Layout>
  );
};

export default AdminLoginPage;
