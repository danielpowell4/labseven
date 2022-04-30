import * as React from "react";
import Link from "next/link";
import styles from "./SiteNav.module.css";

const LINKS = [
  { href: "", children: "Link 1" },
  { href: "", children: "Link 2" },
  { href: "", children: "Link 3" },
  { href: "", children: "Link 4" },
  { href: "", children: "Link 5" },
];

const SiteNav = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>LOGO</div>
      <nav className={styles.nav}>
        <ul>
          {LINKS.map(({ href, children }) => (
            <li>
              <Link href={href}>
                <a>{children}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.locales}>FLAGS</div>
    </header>
  );
};

export default SiteNav;
