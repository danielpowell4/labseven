import * as React from "react";
import { useFormik } from "formik";
import isEqual from "react-fast-compare";
import { useDebounceCallback } from "@react-hook/debounce";

const INITIAL_PRODUCT = {
  categoryCode: "",
  manufacturerCode: "",
  manufacturerSkuCode: "",
  colorNameCode: "",
  sizeChart: {},
};

const FIELD_RESETS = {
  categoryCode: {
    manufacturerCode: "",
    manufacturerSkuCode: "",
    colorNameCode: "",
    sizeChart: {},
  },
  manufacturerCode: {
    manufacturerSkuCode: "",
    colorNameCode: "",
    sizeChart: {},
  },
  manufacturerSkuCode: { colorNameCode: "", sizeChart: {} },
  colorNameCode: { sizeChart: {} },
};

const FORM_STORAGE_KEY = "orderForm";

export const useOrderForm = () => {
  // product options
  // - too heavy for server side props, loaded from api on demand
  // - options seen loaded in memory state map (ephemeral)
  // - options selected persisted to form state (persists)
  const [productCacheMap, setProductCacheMap] = React.useState(new Map());
  const updateProductCacheMap = (product) => {
    console.log("updateProductCacheMap", product);
    setProductCacheMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(product.manufacturerSkuCode, product);
      return newMap;
    });
  };
  const upsertProductContext = (selectedProduct) => {
    formik.setFieldValue(
      `context.${selectedProduct.manufacturerSkuCode}`,
      selectedProduct
    );
  };

  const formik = useFormik({
    initialValues: {
      products: [INITIAL_PRODUCT],
      context: {},
    },
  });
  const prevFormikValues = React.useRef();

  // persist values to local storage
  const persistForm = useDebounceCallback((data) =>
    window.localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data))
  );
  React.useEffect(() => {
    if (prevFormikValues.current) {
      // not first mount... subsequent changes
      // - debounced save to local storage onChange
      if (!isEqual(formik.values, prevFormikValues.current)) {
        persistForm(formik.values);
      }
    } else {
      // first mount
      // - load from localStorage
      prevFormikValues.current = formik; // set for next run
      const maybeState = window.localStorage.getItem(FORM_STORAGE_KEY);
      if (maybeState && maybeState !== null) {
        const storedValues = JSON.parse(maybeState);
        formik.setValues(storedValues);
        if (storedValues.context) {
          Object.values(storedValues.context).forEach((product) =>
            updateProductCacheMap(product)
          );
        }
      }
    }
  }, [formik.values]);

  // product helpers
  const addProduct = () => {
    const prevProducts = formik.values.products;
    formik.setFieldValue("products", [...prevProducts, INITIAL_PRODUCT]);
  };
  const cloneProduct = (index) => {
    const prevProducts = formik.values.products;
    formik.setFieldValue(
      "products",
      prevProducts.flatMap((p, pIndex) =>
        index === pIndex ? [p, { ...p, colorNameCode: "" }] : p
      )
    );
  };
  const removeProduct = (index) => {
    const prevProducts = formik.values.products;
    if (prevProducts.length === 1) {
      formik.setFieldValue("products", [INITIAL_PRODUCT]);
    } else {
      formik.setFieldValue(
        "products",
        prevProducts.filter((_p, pIndex) => index !== pIndex)
      );
    }
  };
  const updateProduct = (index, name, newValue) => {
    const prevProducts = formik.values.products;
    const dependentFieldResets = FIELD_RESETS[name];

    formik.setFieldValue(
      "products",
      prevProducts.map((product, pIndex) =>
        index === pIndex
          ? { ...product, ...dependentFieldResets, [name]: newValue }
          : product
      )
    );
  };

  return {
    formik,
    addProduct,
    cloneProduct,
    removeProduct,
    updateProduct,
    upsertProductContext,
    productCacheMap,
    updateProductCacheMap,
  };
};
