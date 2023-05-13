import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button, Layout, LinkButton } from "components";

import ArrowRight from "public/assets/Arrows/Right.svg";
import StartArrow from "public/assets/Order/StartArrow.svg";
import Step1_Shirt from "public/assets/Home/Step1_Shirt.svg";
import CopyProduct from "public/assets/Order/CopyProduct.svg";
import RemoveProduct from "public/assets/Order/RemoveProduct.svg";

import styles from "./OrderForm.module.css";
import homeStyles from "/pages/dev/Home.module.css";

import { stringify } from "qs";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import { getAllProductCategories, getAllProducts } from "lib/products";
import { useOrderForm } from "lib/orderForm";

export async function getStaticProps({ _params }) {
  // build manufacturer database
  const allProducts = await getAllProducts();
  const manufacturersByCategoryCode = {}; // categoryCode => manufacturerCode[]
  const manufacturerLabelMap = {}; // code => label

  for (const product of allProducts) {
    const Manufacturer = product.Manufacturer;
    const manufacturerCode = product.manufacturerCode;

    // - add label
    if (!manufacturerLabelMap[manufacturerCode]) {
      manufacturerLabelMap[manufacturerCode] = Manufacturer;
    }

    // - add to categories
    for (const category of product.Categories) {
      const prevManufacturers =
        manufacturersByCategoryCode[category.code] || [];
      if (!prevManufacturers.includes(manufacturerCode)) {
        manufacturersByCategoryCode[category.code] = [
          ...prevManufacturers,
          manufacturerCode,
        ];
      }
    }
  }

  // build options
  const allProductCategoryData = await getAllProductCategories(); // for menu
  const categoryOptions = allProductCategoryData.map((category) => ({
    label: category.Name,
    value: category.code,
    manufacturerOptions: manufacturersByCategoryCode[category.code]
      .map((mCode) => ({
        label: manufacturerLabelMap[mCode],
        value: mCode,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  }));

  return {
    props: { categoryOptions },
  };
}

const buildProductOptionsFromCache = (productMap, formRow) => {
  const options = [];
  const values = productMap.values();

  for (const product of values) {
    const categoryCodes = product.Categories.map((cat) => cat.code);
    if (
      categoryCodes.includes(formRow.categoryCode) &&
      product.manufacturerCode === formRow.manufacturerCode
    ) {
      options.push(product.asOption);
    }
  }

  return options;
};

const PickProduct = ({ categoryOptions }) => {
  const {
    formik,
    addProduct,
    cloneProduct,
    removeProduct,
    updateProduct,
    upsertProductContext,
    productCacheMap,
    updateProductCacheMap,
  } = useOrderForm();

  const loadOptions = (product, inputValue, currentOpt) => {
    const query = {
      categoryCode: product.categoryCode,
      manufacturerCode: product.manufacturerCode,
      q: inputValue,
    };

    return fetch(`/api/products?${stringify(query)}`)
      .then((res) => res.json())
      .then((data) => {
        const options = [];

        for (const product of data.products) {
          const option = {
            value: product.manufacturerSkuCode,
            label: product.Name + " - " + product.ManufacturerSku,
          };
          const selectedOption = {
            value: product.manufacturerSkuCode,
            label: product.ManufacturerSku,
          };
          if (!productCacheMap.has(product.manufacturerSkuCode)) {
            updateProductCacheMap({
              ...product,
              asOption: option,
              asSelectedOption: selectedOption,
            });
          }
          options.push(option);
        }
        if (currentOpt) options.push(currentOpt);
        return options;
      });
  };

  return (
    <Layout className={styles.background}>
      <h2 className={styles.startHeader}>
        <Image
          src={StartArrow}
          alt={"Start Arrow"}
          className={styles.startArrow}
          aria-hidden={true}
        />
        Start your <span className={homeStyles.Underline1}>awesome</span>{" "}
        project:
      </h2>
      <div className={styles.formContainer}>
        <nav className={styles.formNav} aria-label="Order Form Navigation">
          <Link
            href="/order/size-breakdown"
            className={styles.formNav__next}
            scroll={false}
          >
            <Image src={ArrowRight} alt={"Arrow forward to Size Breakdown"} />
          </Link>
        </nav>
        <Image
          src={Step1_Shirt}
          alt="Hand drawn sketch of a t-shirt"
          style={{ maxWidth: "10rem", height: "auto" }}
        />
        <h1 className={styles.stepTitle}>1. Pick your blank products</h1>
        <div className={styles.form__body}>
          <ol className={styles.productGrid}>
            {formik.values.products.map((product, index) => {
              const selectedCategory =
                categoryOptions.find(
                  (opt) => opt.value === product.categoryCode
                ) || null;
              const manufacturerOptions =
                selectedCategory?.manufacturerOptions || [];
              const selectedManufacturer =
                manufacturerOptions.find(
                  (opt) => opt.value === product.manufacturerCode
                ) || null;
              const selectedProduct =
                productCacheMap.get(product.manufacturerSkuCode) || null;
              const defaultProductOptions = selectedManufacturer
                ? buildProductOptionsFromCache(productCacheMap, product)
                : [];
              const colorOptions = selectedProduct?.Styles?.length
                ? selectedProduct.Styles.map((style) => {
                    return {
                      value: style.nameCode,
                      label: style.Name,
                    };
                  })
                : [];
              const selectedColor =
                colorOptions.find(
                  (opt) => opt.value === product.colorNameCode
                ) || null;

              return (
                <li key={index} className={styles.productGrid__item}>
                  <Select
                    id={`products[${index}].category`}
                    className={styles.productGrid__item__Select}
                    placeholder="Category..."
                    options={categoryOptions}
                    onChange={(selected) =>
                      updateProduct(index, "categoryCode", selected?.value)
                    }
                    value={selectedCategory}
                  />
                  <Select
                    id={`products[${index}].manufacturer`}
                    className={styles.productGrid__item__Select}
                    placeholder="Brand..."
                    options={manufacturerOptions}
                    onChange={(selected) =>
                      updateProduct(index, "manufacturerCode", selected?.value)
                    }
                    value={selectedManufacturer}
                    isDisabled={!manufacturerOptions.length}
                  />
                  <AsyncSelect
                    id={`products[${index}].sku`}
                    className={styles.productGrid__item__Select}
                    placeholder="Style..."
                    loadOptions={(inputValue) =>
                      loadOptions(
                        product,
                        inputValue,
                        selectedProduct?.asOption
                      )
                    }
                    onChange={(selected) => {
                      const val = selected?.value;
                      updateProduct(index, "manufacturerSkuCode", val);
                      if (val) upsertProductContext(productCacheMap.get(val));
                    }}
                    value={selectedProduct?.asSelectedOption || null}
                    cacheOptions={!!selectedProduct?.asOption} // force refetch on change
                    isDisabled={!selectedManufacturer}
                    defaultOptions={defaultProductOptions}
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue ? "Type to search..." : "No styles found"
                    }
                  />
                  <Select
                    id={`products[${index}].colorNameCode`}
                    className={styles.productGrid__item__Select}
                    placeholder="Color..."
                    options={colorOptions}
                    onChange={(selected) =>
                      updateProduct(index, "colorNameCode", selected?.value)
                    }
                    value={selectedColor}
                    isDisabled={!colorOptions.length}
                  />
                  <div className={styles.productGrid__item__icons}>
                    <Button
                      title="Copy Product"
                      onClick={() => cloneProduct(index)}
                      className="ButtonTransparent"
                    >
                      <Image
                        src={CopyProduct}
                        alt={"Icon to remove product selection from form"}
                        width={32}
                        height={32}
                      />
                    </Button>
                    <Button
                      title="Remove Product"
                      onClick={() => removeProduct(index)}
                      className="ButtonTransparent"
                    >
                      <Image
                        src={RemoveProduct}
                        alt={"Icon to remove product selection from form"}
                        width={32}
                        height={32}
                      />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <div className={styles.form__actions}>
          <Button onClick={addProduct} className="ButtonAlternate">
            Add Another Style
          </Button>
          <LinkButton href="/order/size-breakdown" scroll={false}>
            Proceed
          </LinkButton>
        </div>
        <small className={styles.helpText}>
          Not sure? <Link href="/products">Browse the catalog.</Link>
        </small>
      </div>
    </Layout>
  );
};

export default PickProduct;
