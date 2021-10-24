import Link from "next/link";
import styles from "./ColorOption.module.css";

const ColorOption = ({ style, isActive = false }) => {
  return (
    <li key={style.ID}>
      <Link href={style.href}>
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
            }}
          />
        </a>
      </Link>
    </li>
  );
};

export default ColorOption;
