import Link from "next/link";

import styles from "./LinkButton.module.css";

const LinkButton = ({ className = "LinkButton", ...props }) => {
  return <Link className={styles[className]} {...props} />;
};

export default LinkButton;
