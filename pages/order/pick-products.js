import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button, Layout } from "components";

import ArrowRight from "public/assets/Arrows/Right.svg";

import styles from "./OrderForm.module.css";

const PickProduct = () => {
  return (
    <Layout>
      <div className={styles.background}>
        <div className={styles.formContainer}>
          <nav className={styles.formNav} aria-label="Order Form Navigation">
            <Link href="/order/size-breakdown" className={styles.formNav__next}>
              <Image src={ArrowRight} alt={"Arrow forward to Size Breakdown"} />
            </Link>
          </nav>
          <h1 className={styles.stepTitle}>1. Pick your blank products</h1>
          <div className={styles.form__body}>
            <code>TODO: add line items here!</code>
          </div>
          <div className={styles.form__actions}>
            <Button onClick={(e) => alert(`clicked ${e.target.innerHTML}`)}>
              Add another style
            </Button>
            <Link href="/order/size-breakdown">Proceed</Link>
          </div>
          <small>
            Not sure? <Link href="/products">Browse the catalog.</Link>
          </small>
        </div>
      </div>
    </Layout>
  );
};

export default PickProduct;
