import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Layout } from "../../components";
import {
  getAllProductCategories,
  getProductCategory,
} from "../../lib/products";

import categoryStyles from "./styles/category.module.css";

export async function getStaticPaths() {
  const allCategories = await getAllProductCategories();
  const paths = [];

  for (const category of allCategories) {
    paths.push({
      params: {
        productCategoryCode: category.code,
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const categoryData = await getProductCategory(params.productCategoryCode);
  return {
    props: {
      categoryData,
    },
  };
}

const Category = ({ categoryData }) => {
  return <pre>{JSON.stringify(categoryData, null, 2)}</pre>;
};

export default Category;
