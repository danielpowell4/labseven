// This is server-side rendered
// As of Nov '23 it's only being used by the admin portal

import * as React from "react";

import "styles/globals.css";

// import { SiteNav, SiteFooter, FixedFooter } from ".";
// import styles from "./layout.module.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weights: [800],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const siteTitle =
  "Denver Screen Printing & Custom T-Shirt Printing | Lab Seven Screen Printing Co.";
const description =
  "Lab Seven Screen Printing Co. is the leader in Denver Screen Printing, Custom T-shirt Printing, Graphic Design, and Embroidery in Colorado. Design your own t-shirt in our design studio or work with one of our artists to bring your custom tee to life.";

export const metadata = {
  title: siteTitle,
  description,
  "og:type": "website",
  "og:title": siteTitle,
  "og:description": description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>{children}</body>
    </html>
  );
}
