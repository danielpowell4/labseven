import * as React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { Button } from ".";
import { titleize } from "../lib/utils";
import { validateCalculator, SideLabel } from "./ProductCalculator";

import calcStyles from "./ProductCalculator.module.css";

import axios from "axios";

// https://demo.inksoft.com/demo?Page=Api2#methods_GetQuote
const QUOTE_ENDPOINT =
  "https://stores.labseven.co/Lab_Seven_Screen_Printing_Co/Api2/GetQuote";

// see https://demo.inksoft.com/demo?Page=Api2#viewModels_PricedQuoteItem
const buildQuoteItem = (productParam, values) => ({
  ...productParam,
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

const productsToParams = (products) =>
  products
    .filter((productData) => !!productData.Styles.length)
    .map((productData) => {
      const defaultStyle = productData.Styles[0];
      return {
        ProductId: productData.ID,
        ProductStyleId: defaultStyle.ID,
        ProductStyleSizeId: defaultStyle.Sizes[0].ID, // assume first
      };
    });

const buildPayload = (products, values) => {
  let formData = new FormData();

  formData.append(
    "QuoteItems",
    JSON.stringify(
      productsToParams(products).map((p) => buildQuoteItem(p, values))
    )
  );

  return formData;
};

const getQuote = (products, values) => {
  const payload = buildPayload(products, values);

  return axios.post(QUOTE_ENDPOINT, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset='utf-8'",
    },
  });
};

const ProductsCalculator = ({ products, setQuote, isLoading }) => {
  const [error, setError] = React.useState();

  const allSides = products.reduce((collection, product) => {
    for (let Side of product.Sides) {
      if (!collection.some((s) => s.Side == Side.Name)) {
        collection.push({ Side: Side.Name });
      }
    }
    return collection;
  }, []);

  const defaultSide = allSides.find((s) => s.Side === "front") || allSides[0];
  if (!defaultSide) return null; // no sides, hide calculator

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
      <Formik
        initialValues={initialValues}
        validate={validateCalculator}
        onSubmit={async (values) => {
          setError(); // clear last error
          try {
            const res = await getQuote(products, values);
            setQuote(res.data);
          } catch (err) {
            setError(err);
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue, handleSubmit }) => (
          <Form className={calcStyles.form} onSubmit={handleSubmit}>
            <div className={calcStyles.formEl}>
              <div className={calcStyles.formSideGrid}>
                <label htmlFor="Quantity">Total Quantity</label>
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
                  <h4>Number of Ink Colors</h4>
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
              <Button
                type="submit"
                disabled={isSubmitting || isLoading}
                isSubmitting={isSubmitting || isLoading}
              >
                Get Quote
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      {!!error && (
        <div>
          <h5>
            Oh no! An error occurred:{" "}
            <span style={{ color: "var(--danger)" }}>{error.message}</span>
          </h5>
          <details>
            <summary>Full Details</summary>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default ProductsCalculator;
