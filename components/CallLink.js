import Link from "next/link";

import { isMobile } from "lib/utils";

import styles from "./LinkButton.module.css";

const telLink = "tel:+13038143389"; // (303) 814-3389
const contactLink = "/contact";

const CallLink = ({ className = "LinkButton", ...props }) => {
  const href = isMobile() ? telLink : contactLink;

  return (
    <Link className={styles[className]} href={href} {...props}>
      {props.children || "Call Us"}
    </Link>
  );
};

export default CallLink;
