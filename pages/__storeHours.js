import * as React from "react";
import Head from "next/head";
import { Layout } from "../components";

// Monday - Friday: 9:00AM - 5:00PM
// Saturday - Sunday: CLOSED
// 0 = Sunday, 6 = Saturday
const STORE_HOURS = [
  { label: "Monday", wDay: 1, open: 9, close: 17 },
  { label: "Tuesday", wDay: 2, open: 9, close: 17 },
  { label: "Wednesday", wDay: 3, open: 9, close: 17 },
  { label: "Thursday", wDay: 4, open: 9, close: 17 },
  { label: "Friday", wDay: 5, open: 9, close: 17 },
  { label: "Saturday", wDay: 6, open: 0, close: 0 },
  { label: "Sunday", wDay: 0, open: 0, close: 0 },
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

const StoreHours = () => {
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
        <meta name="robots" content="noindex" />
      </Head>
      <h1>Store Hours</h1>
      <p>This page offers a little demo of a open/closed widget</p>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Hours</th>
            <th>{/* icon */}</th>
          </tr>
        </thead>
        <tbody>
          {STORE_HOURS.map(({ label, wDay, open, close }) => {
            const openTime = new Date();
            openTime.setUTCHours(open + denverOffset);
            openTime.setMinutes(0);
            const openString = openTime.toLocaleString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              timeZone: userZone,
            });
            const closeTime = new Date();
            closeTime.setUTCHours(close + denverOffset);
            closeTime.setMinutes(0);
            const closeString = closeTime.toLocaleString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              timeZone: userZone,
            });

            const dayRange =
              openString === closeString
                ? "Closed"
                : `${openString} - ${closeString}`;

            const isToday = wDay === userCurrentTime.getDay();
            const isOpen =
              isToday &&
              openTime <= userCurrentTime &&
              userCurrentTime <= closeTime;

            return (
              <tr key={label}>
                <td>{label}</td>
                <td>{dayRange}</td>
                <td>
                  {isToday && (
                    <span
                      style={{
                        color: isOpen ? "var(--primary)" : "var(--danger)",
                      }}
                    >
                      ●
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default StoreHours;
