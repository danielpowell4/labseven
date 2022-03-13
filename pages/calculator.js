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
      Created: "2022-01-19T14:22:19.253Z",
      TaxExempt: false,
      HasProductArt: false,
      DesignDetailsForm: false,
      DesignOnline: true,
      BuyBlank: false,
      IsStatic: false,
      CanEmbroider: false,
      CanScreenPrint: true,
      CanDigitalPrint: false,
      CanPrint: true,
      Active: true,
      StyleCount: 0,
      SupplierId: 1000002,
      ManufacturerId: 1000075,
      ID: 1003429,
      Keywords: ["NEA100", "Era Heritage Blend Crew Tee", "New Era Apparel"],
      DecoratedProductSides: null,
      PriceRuleDiscount: null,
      Categories: [
        {
          ID: 1000004,
          Path: "T-Shirts / Mens/Unisex",
          Name: "Mens/Unisex",
        },
      ],
      Styles: [
        {
          IsHeathered: false,
          IsDarkColor: false,
          IsLightColor: false,
          Active: true,
          IsDefault: true,
          CanEmbroider: false,
          CanScreenPrint: false,
          CanDigitalPrint: false,
          CanPrint: false,
          ID: 1027173,
          Sides: [
            {
              Colorway: null,
              Height: null,
              Width: null,
              ImageFilePath:
                "/images/products/756/products/NEA100/Black/front/500.png",
              Side: "front",
              hasImage: true,
              imageUrl:
                "https://stores.labseven.co/images/products/756/products/NEA100/Black/front/500.png",
            },
            {
              Colorway: null,
              Height: null,
              Width: null,
              ImageFilePath:
                "/images/products/756/products/NEA100/Black/back/500.png",
              Side: "back",
              hasImage: true,
              imageUrl:
                "https://stores.labseven.co/images/products/756/products/NEA100/Black/back/500.png",
            },
          ],
          Sizes: null,
          AvailableQuantityPacks: [],
          ColorwayImageFilePath_Front: null,
          ImageFilePath_Front:
            "/images/products/756/products/NEA100/Black/front/500.png",
          Name: "Black",
          HtmlColor2: null,
          HtmlColor1: "000000",
          nameCode: "black",
          href: "/product/new era apparel-nea100/black",
          hasMainImage: true,
          mainImageUrl:
            "https://stores.labseven.co/images/products/756/products/NEA100/Black/front/500.png",
        },
      ],
      StoreIds: null,
      Personalizations: [],
      ProductType: "Standard",
      SalePrice: null,
      UnitPrice: 8.5,
      UnitCost: null,
      EnforceProductInventoriesSupplier: null,
      EnforceProductInventoriesLocal: null,
      StaticDesignId: null,
      MaxColors: null,
      SourceProductId: null,
      SizeChartUrl: null,
      SizeUnit: null,
      PersonalizationType: "none",
      Name: "Era Heritage Blend Crew Tee",
      Sku: "NEA100",
      Supplier: "Sanmar",
      ManufacturerSku: "NEA100",
      Manufacturer: "New Era Apparel",
      manufacturerSkuCode: "new era apparel-nea100",
      defaultHref: "/product/new era apparel-nea100/black",
      activeStyle: {
        IsHeathered: false,
        IsDarkColor: false,
        IsLightColor: false,
        Active: true,
        IsDefault: true,
        CanEmbroider: false,
        CanScreenPrint: false,
        CanDigitalPrint: false,
        CanPrint: false,
        ID: 1027173,
        Sides: [
          {
            Colorway: null,
            Height: null,
            Width: null,
            ImageFilePath:
              "/images/products/756/products/NEA100/Black/front/500.png",
            Side: "front",
            hasImage: true,
            imageUrl:
              "https://stores.labseven.co/images/products/756/products/NEA100/Black/front/500.png",
          },
          {
            Colorway: null,
            Height: null,
            Width: null,
            ImageFilePath:
              "/images/products/756/products/NEA100/Black/back/500.png",
            Side: "back",
            hasImage: true,
            imageUrl:
              "https://stores.labseven.co/images/products/756/products/NEA100/Black/back/500.png",
          },
        ],
        Sizes: null,
        AvailableQuantityPacks: [],
        ColorwayImageFilePath_Front: null,
        ImageFilePath_Front:
          "/images/products/756/products/NEA100/Black/front/500.png",
        Name: "Black",
        HtmlColor2: null,
        HtmlColor1: "000000",
        nameCode: "black",
        href: "/product/new era apparel-nea100/black",
        hasMainImage: true,
        mainImageUrl:
          "https://stores.labseven.co/images/products/756/products/NEA100/Black/front/500.png",
      },
      styleNameCode: "black",
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Calculator Prototype</title>
      </Head>
      <div className={calcStyles.pageContainer}>
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
        <hr />
        <div>
          <h2 style={{ display: "inline" }}>Products</h2>
          <ul>
            {products.map((product) => (
              <li key={product.ID}>
                <a href={product.defaultHref}>{`View ${product.Name}`}</a>
                <details>
                  <summary>view data</summary>
                  <pre>{JSON.stringify(products, null, 2)}</pre>
                </details>
              </li>
            ))}
          </ul>
        </div>
        <hr />
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
