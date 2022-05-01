import * as React from "react";
import styles from "./Button.module.css";

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
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
