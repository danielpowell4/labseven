import Link from "next/link";

import { isMobile } from "lib/utils";

import styles from "./LinkButton.module.css";

const contactLink = "/contact";

const CallLink = ({
  className = "LinkButton",
  telLink = "tel:+13038143389",
  ...props
}) => {
  const href = isMobile() ? telLink : contactLink;

  return (
    <Link className={styles[className]} href={href} {...props}>
      {props.children || "Call Us"}
    </Link>
  );
};

export default CallLink;
