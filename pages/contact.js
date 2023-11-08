import * as React from "react";
import Head from "next/head";
import { Layout, LinkButton, RotatingLogo } from "/components";

import styles from "./Contact.module.css";
import utilStyles from "/styles/utils.module.css";

import { WaveCta } from ".";

// Monday - Thursday: 8:30AM - 4:30PM
// Friday: 8:30AM - 4:00PM
// Saturday - Sunday: CLOSED
// 0 = Sunday, 6 = Saturday
const STORE_HOURS = [
  { label: "Monday", wDay: 1, open: [8, 30], close: [16, 30] },
  { label: "Tuesday", wDay: 2, open: [8, 30], close: [16, 30] },
  { label: "Wednesday", wDay: 3, open: [8, 30], close: [16, 30] },
  { label: "Thursday", wDay: 4, open: [8, 30], close: [16, 30] },
  { label: "Friday", wDay: 5, open: [8, 30], close: [16, 0] },
  { label: "Saturday", wDay: 6, open: [0, 0], close: [0, 0] },
  { label: "Sunday", wDay: 0, open: [0, 0], close: [0, 0] },
];

function getUserTimeZone() {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone;
  } catch (error) {
    console.error("Error retrieving user time zone:", error);
    return "America/Denver"; // Fallback to Mountain Time
  }
}

const ContactPage = () => {
  const userZone = getUserTimeZone();
  const currentTime = new Date();
  const userCurrentTime = new Date(
    currentTime.toLocaleString("en-US", { timeZone: userZone })
  );
  const denverCurrentTime = new Date(
    currentTime.toLocaleString("en-US", { timeZone: "America/Denver" })
  );
  const denverOffset = denverCurrentTime.getTimezoneOffset() / 60;

  return (
    <Layout>
      <Head>
        <meta
          name="description"
          content="(303) 814-3389 | S Platte River Dr Englewood, CO 80110 | Contact our Local Team You Can Trust"
        />
      </Head>
      <div className={styles.ContactPage}>
        <div className={styles.leadWrap}>
          <RotatingLogo />
          <h1>
            We'd love to hear from you.
            <br />
            Get in touch{" "}
            <span role="img" aria-label="Waving hand">
              👋
            </span>
          </h1>
        </div>

        <div className={styles.contactMethods}>
          <p>Phone: (303) 814-3389</p>
          <p>Email: info@labseven.co</p>
          <LinkButton href="/order/pick-products">Start Order</LinkButton>
        </div>

        <h2>Operating Hours</h2>
        <table className={styles.hours}>
          <thead>
            <tr className={styles.hours__row}>
              <th className={styles.hours__row__icon}>{/* icon */}</th>
              <th className={styles.hours__row__day}>Day</th>
              <th className={styles.hours__row__hours}>Hours</th>
            </tr>
          </thead>
          <tbody>
            {STORE_HOURS.map(({ label, wDay, open, close }) => {
              const openTime = new Date();
              const [openHours, openMinutes] = open;
              openTime.setUTCHours(openHours + denverOffset);
              openTime.setMinutes(openMinutes);
              const openString = openTime.toLocaleString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                timeZone: userZone,
              });
              const closeTime = new Date();
              const [closeHours, closeMinutes] = close;
              closeTime.setUTCHours(closeHours + denverOffset);
              closeTime.setMinutes(closeMinutes);
              const closeString = closeTime.toLocaleString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                timeZone: userZone,
              });

              const dayRange =
                openString === closeString ? (
                  "Closed"
                ) : (
                  <>
                    <time>{openString}</time> - <time>{closeString}</time>
                  </>
                );

              const isToday = wDay === userCurrentTime.getDay();
              const isOpen =
                isToday &&
                openTime <= userCurrentTime &&
                userCurrentTime <= closeTime;

              return (
                <tr key={label}>
                  <td className={styles.hours__row__icon}>
                    {isToday && (
                      <span
                        className={utilStyles.tooltipped}
                        style={{
                          color: isOpen ? "var(--primary)" : "var(--danger)",
                        }}
                        role="img"
                        aria-label={
                          isOpen ? "We are open" : "We are currently closed"
                        }
                      >
                        ●
                      </span>
                    )}
                  </td>
                  <td className={styles.hours__row__day}>{label}</td>
                  <td className={styles.hours__row__hours}>{dayRange}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>After hours pickup by appointment available. Call to schedule!</p>
      </div>
      <WaveCta />
    </Layout>
  );
};

export default ContactPage;
