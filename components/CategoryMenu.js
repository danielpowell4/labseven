import Link from "next/link";

import styles from "./CategoryMenu.module.css";

const CategoryMenu = ({
  categories,
  activeCategory,
  activeSubCategory = {},
}) => {
  const hasActiveSubCategory = !!activeSubCategory.ID;

  if (!!activeCategory) {
    return (
      <nav className={styles.nav}>
        <Link href="/products">
          <a className={styles.activeHelperLink}>Products</a>
        </Link>
        <h1>
          {hasActiveSubCategory ? (
            <Link href={activeCategory.href}>
              <a>{activeCategory.Name}</a>
            </Link>
          ) : (
            activeCategory.Name
          )}
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
                  <Link href={subCat.href}>
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
            <Link href={category.href}>
              <a>{category.Name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryMenu;
