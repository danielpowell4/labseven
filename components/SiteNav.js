import * as React from "react";
import Image from "next/image";
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
      <div className={styles.logo}>
        <img src="/assets/Lab-Seven-Logo.svg" height="auto" width={220} />
      </div>
      <nav className={styles.nav}>
        <ul>
          {LINKS.map(({ href, children }, linkIndex) => (
            <li key={linkIndex}>
              <Link href={href}>
                <a>{children}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.locales}>
        <Image src="/assets/Colorado-Flag.svg" height={20} width={30} />
        <Image src="/assets/USA-Flag.svg" height={20} width={30} />
      </div>
    </header>
  );
};

export default SiteNav;
