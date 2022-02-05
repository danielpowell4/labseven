import styles from "./ThreeDotLoader.module.css";

const ThreeDotLoader = (props) => (
  <div aria-hidden="true" className={styles.ThreeDotLoader} {...props}>
    <span className={styles.Dot1} />
    <span className={styles.Dot2} />
    <span className={styles.Dot3} />
  </div>
);

export default ThreeDotLoader;
