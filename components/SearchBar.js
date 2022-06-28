import styles from "./SearchBar.module.css";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__inputContainer}>
        <label htmlFor="sort_by">Sort</label>
        <select
          onChange={(event) => setQuery({ sort: event.target.value })}
          value={query.sort || "default"}
        >
          {[
            ["Default", "default"],
            ["Brand A → Z", "brandAZ"],
            ["Brand Z → A", "brandZA"],
            ["Price High → Low", "priceHighLow"],
            ["Price Low → High", "priceLowHigh"],
          ].map(([label, value]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.searchBar__inputContainer}>
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
