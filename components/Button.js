import * as React from "react";
import styles from "./Button.module.css";

import { ThreeDotLoader } from "components";

const Button = ({
  children,
  className = "Button",
  isSubmitting = false,
  ...rest
}) => {
  return (
    <button
      className={`${styles[className]}${
        isSubmitting ? ` ${styles.ButtonIsSubmitting}` : ""
      }`}
      aria-busy={String(isSubmitting)}
      {...rest}
    >
      {children}
      {isSubmitting && <ThreeDotLoader className={styles.LoadingIndicator} />}
    </button>
  );
};

export default Button;
