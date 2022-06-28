import Link from "next/link";
import styles from "./ColorOption.module.css";

const ColorOption = ({ style, isActive = false, replace = false }) => {
  const isWhite =
    style.Name.toLowerCase() === "white" || style.HtmlColor1 === "FFFFFF";

  return (
    <li key={style.ID}>
      <Link href={style.href} replace={replace} scroll={!replace}>
        <a
          title={style.Name}
          className={`${styles.styleOption}${
            isActive ? ` ${styles.styleOptionActive}` : ""
          }`}
        >
          <div
            className={styles.styleOption__color}
            style={{
              backgroundColor: `#${style.HtmlColor1}`,
              border: isWhite && !isActive ? `1px solid var(--hr)` : undefined,
            }}
          />
        </a>
      </Link>
    </li>
  );
};

export default ColorOption;
