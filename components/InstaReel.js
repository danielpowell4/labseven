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
  "lightgreen",
  "grey",
];

const InstaReel = ({ className = "" }) => {
  return (
    <div className={`${styles.className} ${styles.InstaReel}`}>
      {Array(10)
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
