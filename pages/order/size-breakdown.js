import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import { Layout, LinkButton } from "components";

import ArrowLeft from "public/assets/Arrows/Left.svg";
import ArrowRight from "public/assets/Arrows/Right.svg";
import Step2_Sizes from "public/assets/Home/Step2_Sizes.svg";

import styles from "./OrderForm.module.css";
import { useOrderForm } from "lib/orderForm";

const SIZE_PRIORITY = {
  XXS: 0,
  "2XS": 1,
  XS: 2,
  S: 3,
  M: 4,
  L: 5,
  XL: 6,
  "2XL": 7,
  XXL: 7,
  XXXL: 8,
  "3XL": 8,
  XXXXL: 9,
  "4XL": 9,
};

const SizeBreakdown = () => {
  const { formik, updateProduct, productCacheMap } = useOrderForm();

  const displaySize = new Set();

  for (const formRow of formik.values.products) {
    const selectedProduct = productCacheMap.get(formRow.manufacturerSkuCode);
    if (!selectedProduct) continue;

    const selectedStyle = selectedProduct.Styles?.find(
      (style) => style.nameCode === formRow.colorNameCode
    );
    if (!selectedStyle) continue;

    for (const size of selectedStyle.Sizes) {
      displaySize.add(size.Name);
    }
  }

  const orderedSizes = Array.from(displaySize).sort((a, b) => {
    const aPriority = SIZE_PRIORITY[a] || 15;
    const bPriority = SIZE_PRIORITY[b] || 15;

    return aPriority - bPriority || a.localeCompare(b);
  });

  return (
    <Layout>
      <div className={styles.background}>
        <div className={styles.formContainer}>
          <nav className={styles.formNav} aria-label="Order Form Navigation">
            <Link href="/order/pick-products" className={styles.formNav__prev}>
              <Image src={ArrowLeft} alt={"Arrow back to Pick Products"} />
            </Link>
            <Link href="/order/project-notes" className={styles.formNav__next}>
              <Image src={ArrowRight} alt={"Arrow forward to Project Notes"} />
            </Link>
          </nav>
          <Image
            src={Step2_Sizes}
            alt="Hand drawn chart of sizes"
            style={{ maxWidth: "12rem", height: "auto" }}
          />
          <h1 className={styles.stepTitle}>2. Fill out the size breakdown</h1>
          <div
            className={styles.sizeChartContainer}
            style={{ "--sizeCount": orderedSizes.length }}
          >
            <li className={`${styles.sizeChart} ${styles.sizeChartHeader}`}>
              <div className={styles.sizeChart__name} />
              <div className={styles.sizeChart__styles}>
                {orderedSizes.map((size) => (
                  <span key={size}>{size}</span>
                ))}
              </div>
              <span>Qty.</span>
            </li>
            {formik.values.products.map((product, index) => {
              const itemNumber = index + 1; // for humans
              const selectedProduct = productCacheMap.get(
                product.manufacturerSkuCode
              );
              const selectedStyle = selectedProduct?.Styles?.find(
                (style) => style.nameCode === product.colorNameCode
              );
              const productQty = Object.values(product.sizeChart || {}).reduce(
                (acc, size) => acc + Number(size),
                0
              );

              if (!selectedProduct) {
                return (
                  <li
                    key={index}
                    className={`${styles.sizeChart} ${styles.sizeChartError}`}
                  >
                    <h4>Oh no!</h4>
                    <pre style={{ color: "var(--danger)" }}>
                      Need to select Product for #{itemNumber}
                    </pre>
                  </li>
                );
              }

              const sizePrefix = `products[${index}].sizeChart`;

              return (
                <li key={index} className={styles.sizeChart}>
                  <div className={styles.sizeChart__name}>
                    <h3>
                      <small>{itemNumber}. </small>
                      {[selectedProduct.Manufacturer, selectedProduct.Sku].join(
                        " "
                      )}
                    </h3>
                    <p>{selectedStyle?.Name}</p>
                  </div>

                  <div className={styles.sizeChart__styles}>
                    {orderedSizes.map((size, sIndex) => {
                      const sizeAvailable = selectedStyle?.Sizes?.find(
                        (styleSize) => styleSize.Name === size
                      );

                      return (
                        <input
                          key={sIndex}
                          type="number"
                          step="1"
                          min="0"
                          name={`${sizePrefix}.${size}`}
                          disabled={!sizeAvailable}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      );
                    })}
                  </div>

                  <span>{productQty}</span>
                </li>
              );
            })}
          </div>
          <div className={styles.form__actions}>
            <LinkButton href="/order/project-notes">Looks Good!</LinkButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SizeBreakdown;
