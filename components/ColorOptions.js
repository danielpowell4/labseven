import Link from "next/link";
import styles from "./ColorOptions.module.css";

const ColorOptions = ({ Styles, activeStyle = {} }) => {
  return <ul className={styles.options}>
    {Styles.map((style) => (
      <li key={style.ID}>
        <Link href={style.href}>
          <a
            title={style.Name}
            className={`${styles.styleOption}${
              style.ID == activeStyle.ID
                ? ` ${styles.styleOptionActive}`
                : ""
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
    ))}
  </ul>
}

export default ColorOptions;
