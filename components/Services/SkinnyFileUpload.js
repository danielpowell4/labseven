import * as React from "react";
import Image from "next/image";

import { ThreeDotLoader } from "components";

import UploadedIcon from "public/assets/Order/UploadedIcon.svg";

import utilStyles from "/styles/utils.module.css";
import useFileUpload from "lib/useFileUpload";

import styles from "./Services.module.css";

/** connects to dropbox, used in services page forms */
const SkinnyFileUpload = ({ id }) => {
  const nameVal = "Test Name"; // TODO: grab me
  const [attachments, setAttachments] = React.useState([]);
  const addAttachment = React.useCallback(
    (attachment) => {
      setAttachments((prev) => [...prev, attachment]);
    },
    [setAttachments]
  );
  const [uploadData, dropzone] = useFileUpload(nameVal, addAttachment);
  const isUploadDisabled = uploadData?.state === "idle";
  const showUploadLoader =
    uploadData?.state === "idle" || uploadData?.state === "loading";

  return (
    <div className={styles.formContainer}>
      <label htmlFor="attachments" className={styles.form__label}>
        Attachments
      </label>
      <input type="hidden" value={JSON.stringify(attachments)} />
      {uploadData?.state === "success" && (
        <p className={styles.successMessage}>{uploadData.message}</p>
      )}
      <div
        className={[
          styles.dropzoneBox,
          isUploadDisabled && styles.dropzoneBoxIsDisabled,
          attachments.length && styles.dropzoneBoxHasFiles,
        ]
          .filter(Boolean)
          .join(" ")}
        {...dropzone.getRootProps()}
      >
        <input {...dropzone.getInputProps()} disabled={isUploadDisabled} />
        {dropzone.isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop or click to browse.</p>
        )}
      </div>
      {showUploadLoader && <ThreeDotLoader />}
      {uploadData?.state === "error" && (
        <>
          <p style={{ color: "var(--danger)" }}>
            {uploadData?.message || "Something went wrong."}
          </p>
          <small>
            Please refresh and try again. If you get another error, please
            submit this form without attachments and let our team something went
            wrong.
          </small>
        </>
      )}

      {!!attachments.length && (
        <div className={styles.formField}>
          <label className={styles.form__label}>Uploaded Files</label>
          <ul className={styles.uploadDisplayContainer}>
            {attachments.map((fileData, i) => {
              const extension = fileData.name.split(".").pop() || "";

              return (
                <li
                  key={i}
                  className={[
                    styles.uploadDisplay__item,
                    utilStyles.tooltipped,
                  ].join(" ")}
                  aria-label={fileData.name}
                >
                  <Image
                    src={UploadedIcon}
                    alt="Hand-sketch of Uploaded File Icon"
                    style={{ width: "2rem", height: "auto" }}
                  />
                  <div className={styles.uploadDisplay__item__caption}>
                    <p className={styles.uploadDisplay__text}>
                      {extension.toUpperCase()}
                    </p>
                    <p className={styles.uploadDisplay__text}>
                      {fileData.size}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkinnyFileUpload;
