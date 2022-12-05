import styles from "./InstaReel.module.css";

const COLORS = [
  "red",
  "blue",
  "green",
  "purple",
  "aqua",
  "orange",
  "yellow",
  "lavender",
  "thistle",
];

const InstaReel = ({ className = "" }) => {
  return (
    <div className={`${styles.className} ${styles.InstaReel}`}>
      {Array(5)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className={styles.InstaReel__item}
            style={{ backgroundColor: COLORS[index] }}
          ></div>
        ))}
    </div>
  );
};

export default InstaReel;
