import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import axios from "axios";

import calcStyles from "./ProductCalculator.module.css";

const roundNumber = (value) => Number(Number(value).toFixed(2));
const formatUSD = (value) => {
  const rounded = roundNumber(value);
  if (Number.isNaN(rounded)) return "-";

  return rounded.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

// https://demo.inksoft.com/demo?Page=Api2#methods_GetQuote
const QUOTE_ENDPOINT =
  "https://stores.labseven.co/Lab_Seven_Screen_Printing_Co/Api2/GetQuote";

// see https://demo.inksoft.com/demo?Page=Api2#viewModels_PricedQuoteItem
const buildQuoteItem = (productData, values) => ({
  ProductId: productData.ID,
  ProductStyleId: productData.activeStyle.ID,
  ProductStyleSizeId: productData.activeStyle.Sizes[0].ID, // assume first
  Quantity: values.Quantity,
  Sides: [
    {
      SideId: "front",
      NumColors: values.NumColors,
      ArtIdentifier: "one setup",
      IsFullColor: false,
    },
  ],
});

const buildPayload = (productData, values) => {
  let formData = new FormData();

  formData.append(
    "QuoteItems",
    JSON.stringify([buildQuoteItem(productData, values)])
  );

  return formData;
};

const getQuote = async (productData, values) => {
  const payload = buildPayload(productData, values);

  const response = await axios.post(QUOTE_ENDPOINT, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset='utf-8'",
    },
  });

  return response.data;
};

const validateCalculator = (values) => {
  const errors = {};
  if (Number(values.Quantity) < 1) {
    errors.Quantity = "Required";
  }
  if (Number(values.NumColors) < 1) {
    errors.NumColors = "Required";
  }
  return errors;
};

const ProductCalculator = ({ productData }) => {
  const [quote, setQuote] = React.useState();
  const [error, setError] = React.useState();

  const productQuote = (quote?.Data || []).find(
    (q) => q.ProductId === productData.ID
  );

  return (
    <div className={calcStyles.pageContainer}>
      <h3>Instant Quote</h3>
      {!!productQuote && (
        <ul className={calcStyles.quoteList}>
          <li>{formatUSD(productQuote["EachProductTotal"])} Each</li>
          <li>{formatUSD(productQuote["ProductAndPrintingTotal"])} Total</li>
        </ul>
      )}
      <Formik
        initialValues={{ Quantity: 50, NumColors: 2 }}
        validate={validateCalculator}
        onSubmit={async (values) => {
          setError(); // clear last error
          try {
            const res = await getQuote(productData, values);
            setQuote(res);
          } catch (err) {
            setError(err.toJSON());
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={calcStyles.form}>
            <div className={calcStyles.formEl}>
              <label htmlFor="Quantity">Shirts</label>
              <Field id="Quantity" name="Quantity" type="number" step="1" />
              <ErrorMessage name="Quantity" component="div" />
            </div>
            <div className={calcStyles.formEl}>
              <label htmlFor="NumColors">Colors</label>
              <Field id="NumColors" name="NumColors" type="number" step="1" />
              <ErrorMessage name="NumColors" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "..." : "Get Quote"}
            </button>
          </Form>
        )}
      </Formik>
      {!!error && (
        <div>
          <h5>Oh no! An error occurred: {error.message}</h5>
          <details>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default ProductCalculator;
