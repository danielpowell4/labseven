import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button, Layout, LinkButton } from "components";

import ArrowRight from "public/assets/Arrows/Right.svg";
import Step1_Shirt from "public/assets/Home/Step1_Shirt.svg";

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
          <Image
            src={Step1_Shirt}
            alt="Hand drawn sketch of a t-shirt"
            style={{ maxWidth: "10rem", height: "auto" }}
          />
          <h1 className={styles.stepTitle}>1. Pick your blank products</h1>
          <div className={styles.form__body}>
            <code>TODO: add line items here!</code>
          </div>
          <div className={styles.form__actions}>
            <Button
              onClick={(e) => alert(`clicked ${e.target.innerHTML}`)}
              className="ButtonAlternate"
            >
              Add Another Style
            </Button>
            <LinkButton href="/order/size-breakdown">Proceed</LinkButton>
          </div>
          <small className={styles.helpText}>
            Not sure? <Link href="/products">Browse the catalog.</Link>
          </small>
        </div>
      </div>
    </Layout>
  );
};

export default PickProduct;
