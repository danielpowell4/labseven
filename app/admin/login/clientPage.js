"use client";

import * as React from "react";
import { Button } from "components";
import { useAdminAuth } from "lib/auth";

import Layout from "../AdminLayout";
import styles from "../admin.module.css";

const ADMIN_PASSWORD = "hack_in";

const AdminLoginPage = () => {
  const [_authState, dispatch] = useAdminAuth();

  return (
    <Layout>
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
