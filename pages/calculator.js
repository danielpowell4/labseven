import * as React from "react";
import Head from "next/head";
import { Layout } from "../components";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { stringify } from "qs";

import calcStyles from "./calculator.module.css";

// https://demo.inksoft.com/demo?Page=Api2#methods_GetQuote

// $.ajax({
//   type: "POST",
//   url: "https://demo.inksoft.com/demo/Api2/GetQuote",
//   dataType: "text",
//   data: "QuoteItems={{QuoteItems}}&Format=JSON&OverridePricingError=false",
//   processData: false,
//   crossDomain: true,
//   success: function (res) {
//     success(res);
//   },
//   error: function (jqXHR, textStatus, ex) {
//     error(jqXHR, textStatus, ex);
//   },
// });

const QUOTE_ENDPOINT =
  "https://stores.labseven.co/Lab_Seven_Screen_Printing_Co/Api2/GetQuote";

// see https://demo.inksoft.com/demo?Page=Api2#viewModels_PricedQuoteItem
const buildQuoteItem = (productData, values) => ({
  ProductId: productData.ID,
  ProductStyleId: productData.activeStyle.ID,
  // ProductStyleSizeId: null, // size => null
  Quantity: values.Quantity,
  Sides: [
    {
      SideId: "front",
      NumColors: values.NumColors,
      IsFullColor: true,
      ArtIdentifier: "one setup",
      OverrideDecorationMethod: "ScreenPrint",
      // SetupPriceOverride: 3.14,
      // PrintPriceOverrideEach: 3.14,
    },
  ],
});

const buildPayload = (products, values) => ({
  Format: "JSON",
  QuoteItems: products.map((product) => buildQuoteItem(product, values)),
  OverridePricingError: true,
});

const getQuote = async (products, values) => {
  const payload = buildPayload(products, values);

  let response = await fetch(QUOTE_ENDPOINT, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // Accept: "application/json",
    },
    method: "POST",
    body: stringify(payload),
  });
  let json = await response.json();

  return json;
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

const Calculator = () => {
  const [quote, setQuote] = React.useState();
  const [error, setError] = React.useState();

  const products = [
    {
      ID: 1002945,
      activeStyle: {
        ID: 1022799,
        Sides: [
          {
            Colorway: null,
            Height: null,
            Width: null,
            ImageFilePath:
              "/images/products/2728/products/24321OW/NEPTUNE/front/500.png",
            Side: "front",
            hasImage: true,
            imageUrl:
              "https://stores.labseven.co/images/products/2728/products/24321OW/NEPTUNE/front/500.png",
          },
        ],
      },
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Calculator Prototype</title>
      </Head>
      <div className={calcStyles.pageContainer}>
        <details open>
          <summary>
            <strong>Products</strong>
          </summary>
          <pre>{JSON.stringify(products, null, 2)}</pre>
        </details>
        <h1>Calculator</h1>
        <Formik
          initialValues={{ Quantity: 50, NumColors: 2 }}
          validate={validateCalculator}
          onSubmit={async (values) => {
            setError(); // clear last error

            // TODO: remove me after DEV - helps w/ debugging
            setQuote(buildPayload(products, values));

            const res = await getQuote(products, values);
            if (res.OK) {
              setQuote(res);
            } else {
              setError(res);
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
                {isSubmitting ? "..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
        <div>
          <h2>Endpoint</h2>
          <p>{QUOTE_ENDPOINT}</p>
        </div>
        <hr />
        <div>
          <h2>Quote Payload</h2>
          <p>As JSON</p>
          <pre>{JSON.stringify(quote, null, 2)}</pre>
          <p>
            Stringified via{" "}
            <a href="https://www.npmjs.com/package/qs">
              https://www.npmjs.com/package/qs
            </a>
          </p>
          <pre>{stringify(quote)}</pre>
        </div>
        <hr />
        <div>
          <h2>Error</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;
