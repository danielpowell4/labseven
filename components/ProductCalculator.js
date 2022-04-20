import * as React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

import { titleize, formatUSD } from "../lib/utils";

import axios from "axios";

import calcStyles from "./ProductCalculator.module.css";

// https://demo.inksoft.com/demo?Page=Api2#methods_GetQuote
const QUOTE_ENDPOINT =
  "https://stores.labseven.co/Lab_Seven_Screen_Printing_Co/Api2/GetQuote";

// see https://demo.inksoft.com/demo?Page=Api2#viewModels_PricedQuoteItem
const buildQuoteItem = (productData, values) => ({
  ProductId: productData.ID,
  ProductStyleId: productData.activeStyle.ID,
  ProductStyleSizeId: productData.activeStyle.Sizes[0].ID, // assume first
  Quantity: values.Quantity,
  Sides: values.Sides.map(({ SideId, NumColors }) => ({
    SideId,
    NumColors,
    ArtIdentifier: "one setup",
    IsFullColor: false,
  })),
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
  if (Number(values.Quantity) < 12) {
    errors.Quantity = "Minimum quantity of 12";
  }
  const sideValues = values.Sides || [];
  const sideCount = sideValues.length;
  if (Number(values.Quantity) * sideCount > 10000) {
    errors.Quantity = "For large orders, contact our shop!";
  }

  let sideErrors = [];
  sideValues.forEach((side, sideIndex) => {
    if (Number(side.NumColors) < 1) {
      sideErrors[sideIndex] = "Must pick at least 1 color";
    }
    if (Number(side.NumColors) > 8) {
      sideErrors[sideIndex] =
        "For quotes on more than 8 colors, contact our shop!";
    }
  });
  if (sideErrors.length) {
    errors["Sides"] = sideErrors;
  }

  return errors;
};

const ProductCalculator = ({ productData }) => {
  const [quote, setQuote] = React.useState();
  const [error, setError] = React.useState();

  const productQuote = (quote?.Data || []).find(
    (q) => q.ProductId === productData.ID
  );

  const allSides = productData.activeStyle.Sides;
  const defaultSide = allSides.find((s) => s.Side === "front") || allSides[0];

  const initialValues = {
    Quantity: 50,
    Sides: [{ SideId: defaultSide.Side, NumColors: 2 }],
  };

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
        initialValues={initialValues}
        validate={validateCalculator}
        onSubmit={async (values) => {
          setError(); // clear last error
          try {
            const res = await getQuote(productData, values);
            setQuote(res);
          } catch (err) {
            setError(err);
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className={calcStyles.form}>
            <div className={calcStyles.formEl}>
              <label htmlFor="Quantity">Shirts</label>
              <Field id="Quantity" name="Quantity" type="number" step="1" />
              <ErrorMessage name="Quantity" component="div" />
            </div>
            <FieldArray
              name="Sides"
              render={(arrayHelpers) => (
                <div className={calcStyles.formEl}>
                  Colors per Location
                  {values.Sides &&
                    values.Sides.length > 0 &&
                    values.Sides.map((side, sideIndex) => {
                      const fieldId = `Sides.${sideIndex}`;
                      const sideName = titleize(side.SideId);
                      const onValueChange = (event) => {
                        setFieldValue(fieldId, {
                          ...side,
                          NumColors: event.target.value,
                        });
                      };

                      return (
                        <>
                          <div
                            key={sideIndex}
                            className={calcStyles.formSideGrid}
                          >
                            <label htmlFor={fieldId}>{sideName}</label>
                            <Field
                              id={fieldId}
                              name={fieldId}
                              type="number"
                              step="1"
                              value={side.NumColors}
                              onChange={onValueChange}
                            />

                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(sideIndex)} // remove a friend from the list
                            >
                              🗑
                            </button>
                          </div>
                          <ErrorMessage name={fieldId} component="div" />
                        </>
                      );
                    })}
                  {allSides
                    .filter(
                      (side) =>
                        !values.Sides.some((s) => s.SideId === side.Side)
                    )
                    .map((side) => (
                      <button
                        key={side.Side}
                        type="button"
                        className={calcStyles.addFormSideBtn}
                        onClick={() =>
                          arrayHelpers.push({
                            SideId: side.Side,
                            NumColors: 2,
                          })
                        }
                      >
                        Add {titleize(side.Side)} +
                      </button>
                    ))}
                </div>
              )}
            />
            <div className={calcStyles.formActions}>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "..." : "Get Quote"}
              </button>
            </div>
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
