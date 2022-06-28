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
            ["Brand: A → Z", "brandAZ"],
            ["Brand: Z → A", "brandZA"],
            ["Price: High → Low", "priceHighLow"],
            ["Price: Low → High", "priceLowHigh"],
          ].map(([label, value]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.searchBar__inputContainer}>
        <span role="img" aria-label="Magnifying Glass">
          <svg
            fill="currentColor"
            viewBox="0 0 13 13"
            height="15"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.87 8.16l3.25 3.25-.7.71-3.26-3.25a5 5 0 1 1 .7-.7zM5 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
          </svg>
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
