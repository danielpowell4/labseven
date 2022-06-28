import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./CategoryMenu.module.css";

import { SEARCH_KEYS } from "./SearchBar";

const CategoryMenu = ({
  categories,
  activeCategory,
  activeSubCategory = {},
}) => {
  const { query } = useRouter();
  const hasActiveSubCategory = !!activeSubCategory.ID;
  const searchQuery = {};
  for (const searchKey of SEARCH_KEYS) {
    const searchValue = query[searchKey];
    if (searchValue) searchQuery[searchKey] = searchValue;
  }

  if (!!activeCategory) {
    return (
      <nav className={styles.nav}>
        <div className={styles.breadcrumbs}>
          <Link href={{ pathname: "/products", query: searchQuery }}>
            <a className={styles.activeHelperLink}>Products</a>
          </Link>
          {hasActiveSubCategory && (
            <Link href={{ pathname: activeCategory.href, query: searchQuery }}>
              <a className={styles.activeHelperLink}>{activeCategory.Name}</a>
            </Link>
          )}
        </div>

        <h1 className={styles.activeFilterTitle}>
          {hasActiveSubCategory ? activeSubCategory.Name : activeCategory.Name}
        </h1>
        {activeCategory.hasSubCategories && (
          <ul className={styles.subcategoriesList}>
            {activeCategory.SubCategories.map((subCat) =>
              subCat.ID === activeSubCategory.ID ? (
                <li
                  key={subCat.ID}
                  className={`${styles.subcategoriesList__option} ${styles.subcategoriesList__activeOption}`}
                >
                  <h2>{subCat.Name}</h2>
                </li>
              ) : (
                <li
                  key={subCat.ID}
                  className={styles.subcategoriesList__option}
                >
                  <Link href={{ pathname: subCat.href, query: searchQuery }}>
                    <a>{subCat.Name}</a>
                  </Link>
                </li>
              )
            )}
          </ul>
        )}
      </nav>
    );
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.categoriesList}>
        {categories.map((category) => (
          <li key={category.ID} className={styles.categoriesList__option}>
            <Link href={{ pathname: category.href, query: searchQuery }}>
              <a>{category.Name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryMenu;
