import Link from "next/link";

import styles from "./CategoryMenu.module.css";

const CategoryMenu = ({ categories, activeCategory }) => {
  if (!!activeCategory) {
    return (
      <nav className={styles.nav}>
        <Link href="/products">
          <a className={styles.activeHelperLink}>Products</a>
        </Link>
        <h1>{activeCategory.Name}</h1>
        {activeCategory.hasSubCategories && (
          <ul className={styles.subcategoriesList}>
            {activeCategory.SubCategories.map((subCat) => (
              <li key={subCat.ID} className={styles.subcategoriesList__option}>
                <Link
                  href={`${activeCategory.href}?subcategoryID=${subCat.ID}`}
                >
                  <a>{subCat.Name}</a>
                </Link>
              </li>
            ))}
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
