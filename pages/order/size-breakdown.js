import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import { Layout, LinkButton } from "components";

import ArrowLeft from "public/assets/Arrows/Left.svg";
import ArrowRight from "public/assets/Arrows/Right.svg";
import Step2_Sizes from "public/assets/Home/Step2_Sizes.svg";

import styles from "./OrderForm.module.css";

const SizeBreakdown = () => {
  return (
    <Layout>
      <div className={styles.background}>
        <div className={styles.formContainer}>
          <nav className={styles.formNav} aria-label="Order Form Navigation">
            <Link href="/order/pick-products" className={styles.formNav__prev}>
              <Image src={ArrowLeft} alt={"Arrow back to Pick Products"} />
            </Link>
            <Link href="/order/project-notes" className={styles.formNav__next}>
              <Image src={ArrowRight} alt={"Arrow forward to Project Notes"} />
            </Link>
          </nav>
          <Image
            src={Step2_Sizes}
            alt="Hand drawn chart of sizes"
            style={{ maxWidth: "12rem", height: "auto" }}
          />
          <h1 className={styles.stepTitle}>2. Fill out the size breakdown</h1>
          <div className={styles.form__body}>
            <code>TODO: add size chart here!</code>
          </div>
          <div className={styles.form__actions}>
            <LinkButton href="/order/project-notes">Looks Good!</LinkButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SizeBreakdown;
