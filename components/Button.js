import * as React from "react";
import styles from "./Button.module.css";

const Button = ({ children, className = "Button", ...rest }) => {
  return (
    <button className={styles[className]} {...rest}>
      {children}
    </button>
  );
};

export default Button;
