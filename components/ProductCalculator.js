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
  Sides: values.Sides.filter(({ NumColors }) => NumColors > 0).map(
    ({ SideId, NumColors }) => ({
      SideId,
      NumColors,
      ArtIdentifier: "one setup",
      IsFullColor: false,
    })
  ),
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

const ITEM_COLOR_LIMITS = [
  { itemMin: 12, itemMax: 23, colors: 2 },
  { itemMin: 24, itemMax: 49, colors: 4 },
];

const validateCalculator = (values) => {
  const errors = {};
  const Quantity = Number(values.Quantity);

  if (Quantity < 12) {
    errors.Quantity = "Minimum quantity of 12";
  }
  const sideValues = values.Sides || [];
  const sideCount = sideValues.length;
  if (Quantity * sideCount > 10000) {
    errors.Quantity = "For large orders, contact our shop!";
  }

  const colorLimit = ITEM_COLOR_LIMITS.find(
    (set) => Quantity >= set.itemMin && Quantity <= set.itemMax
  );

  const colorMax = colorLimit?.colors || 8;

  let sideErrors = [];
  sideValues.forEach((side, sideIndex) => {
    if (Number(side.NumColors) < 0) {
      sideErrors[sideIndex] = `Cannot be negative`;
    } else if (Number(side.NumColors) > colorMax) {
      sideErrors[sideIndex] = colorLimit
        ? `We have a ${colorMax} color limit for orders between ${colorLimit.itemMin} and ${colorLimit.itemMax} items.`
        : `For quotes on more than ${colorMax} colors, contact our shop!`;
    }
  });
  if (sideErrors.length) {
    errors["Sides"] = sideErrors;
  }

  return errors;
};

const SideLabel = ({ sideName }) => {
  if (sideName === "Sleeveleft") return "Left Sleeve";
  if (sideName === "Sleeveright") return "Right Sleeve";

  return sideName;
};

const ProductCalculator = ({ productData }) => {
  const [quote, setQuote] = React.useState();
  const [error, setError] = React.useState();

  const productQuote = (quote?.Data || []).find(
    (q) => q.ProductId === productData.ID
  );

  const allSides = productData.activeStyle.Sides;
  const defaultSide = allSides.find((s) => s.Side === "front") || allSides[0];
  const otherSides = allSides.filter((s) => s.Side !== defaultSide.Side);

  const initialValues = {
    Quantity: 50,
    Sides: [
      { SideId: defaultSide.Side, NumColors: 2 },
      ...otherSides.map((s) => ({ SideId: s.Side, NumColors: 0 })),
    ],
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
              <div className={calcStyles.formSideGrid}>
                <label htmlFor="Quantity">Shirts</label>
                <Field
                  id="Quantity"
                  name="Quantity"
                  type="number"
                  step="1"
                  min="0"
                />
              </div>
              <ErrorMessage
                name="Quantity"
                component="div"
                className={calcStyles.errorMessage}
              />
            </div>
            <FieldArray
              name="Sides"
              render={(_arrayHelpers) => (
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
                        <React.Fragment key={sideIndex}>
                          <div className={calcStyles.formSideGrid}>
                            <label htmlFor={fieldId}>
                              <SideLabel sideName={sideName} />
                            </label>
                            <Field
                              id={fieldId}
                              name={fieldId}
                              type="number"
                              step="1"
                              min="0"
                              value={side.NumColors}
                              onChange={onValueChange}
                            />
                          </div>
                          <ErrorMessage
                            name={fieldId}
                            component="div"
                            className={calcStyles.errorMessage}
                          />
                        </React.Fragment>
                      );
                    })}
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
