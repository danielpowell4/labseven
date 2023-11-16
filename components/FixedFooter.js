import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./FixedFooter.module.css";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Our Work" },
  { href: "/contact", label: "Contact" },
];

const FixedFooter = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.Nav}>
      <ul>
        {LINKS.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <li key={href} className={isActive ? styles.ActiveItem : ""}>
              <Link href={href}>{label}</Link>
            </li>
          );
        })}
        <li>
          <Link href="tel:+13038143389">Call Now</Link>
        </li>
      </ul>
    </nav>
  );
};

export default FixedFooter;
