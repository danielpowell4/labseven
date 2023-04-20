import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import { Button, Layout, LinkButton } from "components";

import ArrowRight from "public/assets/Arrows/Right.svg";
import Step1_Shirt from "public/assets/Home/Step1_Shirt.svg";

import styles from "./OrderForm.module.css";

import { stringify } from "qs";
import { useFormik } from "formik";
import Select from "react-select";
import AsyncSelect from "react-select/async";

import { getAllProductCategories, getAllProducts } from "lib/products";

export async function getStaticProps({ params }) {
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

const INITIAL_PRODUCT = {
  categoryCode: "",
  manufacturerCode: "",
  manufacturerSkuCode: "",
  colorNameCode: "",
};

const FIELD_RESETS = {
  categoryCode: {
    manufacturerCode: "",
    manufacturerSkuCode: "",
    colorNameCode: "",
  },
  manufacturerCode: { manufacturerSkuCode: "", colorNameCode: "" },
  manufacturerSkuCode: { colorNameCode: "" },
  colorNameCode: {},
};

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
  const formik = useFormik({
    initialValues: {
      products: [INITIAL_PRODUCT],
    },
  });

  // product helpers
  const addProduct = () => {
    const prevProducts = formik.values.products;
    formik.setValues({ products: [...prevProducts, INITIAL_PRODUCT] });
  };
  const cloneProduct = (index) => {
    const prevProducts = formik.values.products;
    formik.setValues({
      products: prevProducts.flatMap((p, pIndex) =>
        index === pIndex ? [p, { ...p, colorNameCode: "" }] : p
      ),
    });
  };
  const removeProduct = (index) => {
    const prevProducts = formik.values.products;
    if (prevProducts.length === 1) {
      formik.setValues({ products: [INITIAL_PRODUCT] });
    } else {
      formik.setValues({
        products: prevProducts.filter((_p, pIndex) => index !== pIndex),
      });
    }
  };
  const updateProduct = (index, name, newValue) => {
    const prevProducts = formik.values.products;
    const dependentFieldResets = FIELD_RESETS[name];

    formik.setValues({
      products: prevProducts.map((product, pIndex) =>
        index === pIndex
          ? { ...product, ...dependentFieldResets, [name]: newValue }
          : product
      ),
    });
  };

  // async product options loaders for 'Style...'
  const [productCacheMap, setProductCacheMap] = React.useState(new Map());
  const updateProductCacheMap = (product) => {
    setProductCacheMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(product.manufacturerSkuCode, product);
      return newMap;
    });
  };
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
          if (!productCacheMap.has(product.manufacturerSkuCode)) {
            updateProductCacheMap({ ...product, asOption: option });
          }
          options.push(option);
        }
        if (currentOpt) options.push(currentOpt);
        return options;
      });
  };

  return (
    <Layout>
      <div className={styles.background}>
        <div className={styles.formContainer}>
          <nav className={styles.formNav} aria-label="Order Form Navigation">
            <Link href="/order/size-breakdown" className={styles.formNav__next}>
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
                      placeholder="Category..."
                      options={categoryOptions}
                      onChange={(selected) =>
                        updateProduct(index, "categoryCode", selected?.value)
                      }
                      value={selectedCategory}
                    />
                    <Select
                      id={`products[${index}].manufacturer`}
                      placeholder="Brand..."
                      options={manufacturerOptions}
                      onChange={(selected) =>
                        updateProduct(
                          index,
                          "manufacturerCode",
                          selected?.value
                        )
                      }
                      value={selectedManufacturer}
                      isDisabled={!manufacturerOptions.length}
                    />
                    <AsyncSelect
                      id={`products[${index}].sku`}
                      placeholder="Style..."
                      loadOptions={(inputValue) =>
                        loadOptions(
                          product,
                          inputValue,
                          selectedProduct?.asOption
                        )
                      }
                      onChange={(selected) => {
                        updateProduct(
                          index,
                          "manufacturerSkuCode",
                          selected?.value
                        );
                      }}
                      value={selectedProduct?.asOption || null}
                      cacheOptions={!!selectedProduct?.asOption} // force refetch on change
                      isDisabled={!selectedManufacturer}
                      defaultOptions={defaultProductOptions}
                      noOptionsMessage={({ inputValue }) =>
                        !inputValue ? "Type to search..." : "No styles found"
                      }
                    />
                    <Select
                      id={`products[${index}].colorNameCode`}
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
                        title="Clone Selection"
                        onClick={() => cloneProduct(index)}
                      >
                        🔁
                      </Button>
                      <Button
                        title="Remove Selection"
                        onClick={() => removeProduct(index)}
                      >
                        💥
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
            <LinkButton href="/order/size-breakdown">Proceed</LinkButton>
          </div>
          <small className={styles.helpText}>
            Not sure? <Link href="/products">Browse the catalog.</Link>
          </small>
        </div>
      </div>
    </Layout>
  );
};

export default PickProduct;
