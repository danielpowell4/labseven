import Link from "next/link";

import { isMobile } from "lib/utils";

import styles from "./LinkButton.module.css";

const contactLink = "/contact";

const CallLink = ({
  className = "LinkButton",
  telLink = "tel:+13038143389",
  locationSlug,
  ...props
}) => {
  let href = contactLink;
  if (isMobile()) {
    href = telLink;
  } else if (locationSlug) {
    href = `${contactLink}?location=${locationSlug}`;
  }

  return (
    <Link className={styles[className]} href={href} {...props}>
      {props.children || "Call Us"}
    </Link>
  );
};

export default CallLink;
