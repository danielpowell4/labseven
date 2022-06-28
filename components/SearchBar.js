import styles from "./SearchBar.module.css";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__queryContainer}>
        <span role="img" aria-label="Magnifying Glass">
          🔍
        </span>
        <input
          type="search"
          onChange={(event) => setQuery({ q: event.target.value })}
          value={query.q || ""}
          placeholder={"Search products..."}
        />
      </div>
    </div>
  );
};

export default SearchBar;
