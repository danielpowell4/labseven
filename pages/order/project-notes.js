import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button, Layout } from "components";

import ArrowLeft from "public/assets/Arrows/Left.svg";

import styles from "./OrderForm.module.css";

const SizeBreakdown = () => {
  return (
    <Layout>
      <div className={styles.background}>
        <div className={styles.formContainer}>
          <nav className={styles.formNav} aria-label="Order Form Navigation">
            <Link href="/order/size-breakdown" className={styles.formNav__prev}>
              <Image src={ArrowLeft} alt={"Arrow back to Size Breakdown"} />
            </Link>
          </nav>
          <h1 className={styles.stepTitle}>3. Upload your logo or idea</h1>
          <div className={styles.form__body}>
            <code>TODO: form details here!</code>
          </div>
          <div className={styles.form__actions}>
            <Button onClick={(e) => alert(`clicked ${e.target.innerHTML}`)}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SizeBreakdown;
