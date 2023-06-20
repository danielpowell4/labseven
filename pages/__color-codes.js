import * as React from "react";
import Head from "next/head";
import { getAllProducts } from "../lib/products";
import { Layout } from "../components";

import cssColorBank from "public/cssColorBank.json";

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function calculateColorDifference(color1, color2) {
  if (!color1 || !color2) return Infinity;

  const { r: r1, g: g1, b: b1 } = color1;
  const { r: r2, g: g2, b: b2 } = color2;
  const deltaR = r1 - r2;
  const deltaG = g1 - g2;
  const deltaB = b1 - b2;
  return Math.sqrt(deltaR ** 2 + deltaG ** 2 + deltaB ** 2);
}

function findClosestColor(targetColor, colorList) {
  let closestColor = null;
  let minColorDiff = Infinity;

  for (const color of colorList) {
    const colorDiff = calculateColorDifference(targetColor, color);
    if (colorDiff < minColorDiff) {
      minColorDiff = colorDiff;
      closestColor = color;
    }
  }

  return closestColor;
}

function castColorGroup(rgb) {
  if (!rgb) return null;

  return findClosestColor(rgb, cssColorBank) || { group: "Unknown" };
}

export async function getStaticProps() {
  const allProducts = await getAllProducts();
  const colorAudit = [];
  const includedColors = new Map();

  for (const product of allProducts) {
    for (const style of product.Styles) {
      const colors = [style.HtmlColor1, style.HtmlColor2].filter(Boolean);
      for (const color of colors) {
        const prevCount = includedColors.get(color) || 0;
        includedColors.set(color, prevCount + 1);
        if (prevCount > 0) continue; // skip duplicates

        const rgb = hexToRgb(color);
        if (rgb) {
          colorAudit.push({
            styleName: style.Name,
            color,
            rgb: `${rgb.r},${rgb.g},${rgb.b}`,
            ...castColorGroup(rgb),
          });
        }
      }
    }
  }

  console.log(includedColors);

  const sortedColorAudit = colorAudit
    .map((item) => ({
      ...item,
      systemCount: includedColors.get(item.color) || 0,
    }))
    .sort((a, b) => {
      if (a.group < b.group) return -1;
      if (a.group > b.group) return 1;
      if (a["CSS Color Name"] < b["CSS Color Name"]) return -1;
      if (a["CSS Color Name"] > b["CSS Color Name"]) return 1;
      return 0;
    });

  return {
    props: { colorAudit: sortedColorAudit },
  };
}

const HEADER_NAMES = [
  "group",
  "styleName",
  "systemCount",
  "CSS Color Name",
  "color",
  "CSS Hex",
];

const ColorCodes = ({ colorAudit }) => {
  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{ maxWidth: 960, margin: "2rem auto" }}>
        <h1>Color Code Compare</h1>
        <p>This page lists colors in the system cast by CSS group.</p>
        <table style={{ textAlign: "right", minWidth: 300 }}>
          <thead>
            <tr>
              {HEADER_NAMES.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {colorAudit.map((color, cIndex) => (
              <tr key={cIndex}>
                {HEADER_NAMES.map((key) => (
                  <td key={key}>
                    {key === "color" && (
                      <span
                        style={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: `#${color[key]}`,
                          display: "inline-block",
                          marginRight: "0.5rem",
                        }}
                      ></span>
                    )}
                    {key === "CSS Hex" && (
                      <span
                        style={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: color[key],
                          display: "inline-block",
                          marginRight: "0.5rem",
                        }}
                      ></span>
                    )}
                    {color[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ColorCodes;
