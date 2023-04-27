import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button, Layout } from "components";

import ArrowLeft from "public/assets/Arrows/Left.svg";
import Step3_Upload from "public/assets/Home/Step3_Upload.svg";

import styles from "./OrderForm.module.css";
import { useOrderForm } from "lib/orderForm";
import useFileUpload from "lib/useFileUpload";

const ProjectNotes = () => {
  const { formik } = useOrderForm();

  const nameVal = React.useMemo(() => formik.values.name, [formik.values.name]);
  const attachmentVal = React.useRef(formik.values.attachments);
  React.useEffect(() => {
    attachmentVal.current = formik.values.attachments;
  }, [formik.values.attachments]);
  const addAttachment = React.useCallback(
    (attachment) => {
      const prev = attachmentVal.current || [];
      formik.setFieldValue("attachments", [...prev, attachment]);
    },
    [formik.setFieldValue]
  );
  const [data, dropzone] = useFileUpload(nameVal, addAttachment);

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
              <div
                style={{
                  border: `2px dashed var(--hr)`,
                  padding: "1rem",
                  background: "lavender",
                  cursor: "pointer",
                }}
                {...dropzone.getRootProps()}
              >
                <input {...dropzone.getInputProps()} />
                {dropzone.isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
              {!!formik.values.attachments.length && (
                <pre>
                  uploaded: {JSON.stringify(formik.values.attachments, null, 2)}
                </pre>
              )}
              <pre>uploadData: {JSON.stringify(data, null, 2)}</pre>
            </div>
          </div>
        </div>
        <div className={styles.form__actions}>
          <Button
            onClick={formik.handleSubmit}
            isSubmitting={formik.isSubmitting}
          >
            Submit
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectNotes;
