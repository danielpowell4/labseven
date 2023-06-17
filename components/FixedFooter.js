import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./FixedFooter.module.css";

const LINKS = [
  { href: "/dev/home", label: "Home" },
  { href: "/products", label: "Catalog" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/order/pick-products", label: "Get Started" },
];

const FixedFooter = () => {
  const router = useRouter();

  return (
    <nav className={styles.Nav}>
      <ul>
        {LINKS.map(({ href, label }) => {
          const isActive = router.pathname === href;
          return (
            <li key={href} className={isActive ? styles.ActiveItem : ""}>
              <Link href={href}>{label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default FixedFooter;
