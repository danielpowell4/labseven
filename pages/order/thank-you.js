import * as React from "react";

import { Layout } from "components";

import styles from "./OrderForm.module.css";

const OrderThankYou = () => {
  return (
    <Layout>
      <div className={styles.background}>
        <div className={styles.formContainer}>
          <h1 className={styles.stepTitle}>Thank you!</h1>
        </div>
      </div>
    </Layout>
  );
};

export default OrderThankYou;
