import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button, Layout } from "components";

import ArrowLeft from "public/assets/Arrows/Left.svg";
import Step3_Upload from "public/assets/Home/Step3_Upload.svg";

import styles from "./OrderForm.module.css";
import { useOrderForm } from "lib/orderForm";

const ProjectNotes = () => {
  const { formik } = useOrderForm();

  return (
    <Layout className={styles.background}>
      <div className={styles.formContainer}>
        <nav className={styles.formNav} aria-label="Order Form Navigation">
          <Link
            href="/order/size-breakdown"
            className={styles.formNav__prev}
            scroll={false}
          >
            <Image src={ArrowLeft} alt={"Arrow back to Size Breakdown"} />
          </Link>
        </nav>
        <Image
          src={Step3_Upload}
          alt="Upload logo to cloud"
          style={{ maxWidth: "9rem", height: "auto" }}
        />
        <h1 className={styles.stepTitle}>3. Upload your logo or idea</h1>
        <div className={styles.notesBlockContainer}>
          <div className={styles.notesBlock}>
            <div className={styles.formField}>
              <label htmlFor="name" className={styles.form__label}>
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.form__input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="email" className={styles.form__label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.form__input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
              />
            </div>
            <div className={styles.formField}>
              <label htmlFor="phone" className={styles.form__label}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={styles.form__input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
            </div>
          </div>
          <div className={styles.notesBlock}>
            <div className={styles.formField}>
              <label htmlFor="notes" className={styles.form__label}>
                Project Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                className={styles.form__input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.notes}
                rows={7}
                placeholder="Write a brief description of your design / concept."
              />
            </div>
          </div>
          <div className={styles.notesBlock}>
            <div className={styles.formField}>
              <label htmlFor="attachments" className={styles.form__label}>
                Attachments
              </label>
              <div className={styles.form__attachments}>
                <input type="file" id="attachments" name="attachments" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.form__actions}>
          <Button onClick={(e) => alert(`clicked ${e.target.innerHTML}`)}>
            Submit
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectNotes;
