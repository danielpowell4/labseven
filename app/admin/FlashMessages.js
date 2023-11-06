"use server";

import styles from "app/admin/admin.module.css";
import { headers } from "next/headers";

const FlashMessages = async () => {
  // get base url, fallback prod
  const headerStore = headers();
  const port = headerStore.get("x-forwarded-proto") ?? "https";
  const host = headerStore.get("x-forwarded-host") ?? "labseven.co";
  const origin = `${port}://${host}`;
  const messagesEndpoint = new URL(`${origin}/api/flash-messages`);

  console.log("origin", origin);

  let messages = [];

  try {
    const res = await fetch(messagesEndpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    }).then((res) => res.json());
    messages = res.messages;
    console.log("messages", messages);
  } catch (err) {
    console.error("Error: failed to get messages -", err);
  }

  if (!messages.length) return null;

  return (
    <div className="flash-messages">
      {messages.map(({ type, message }) => (
        <div
          key={type}
          className={styles.flash}
          style={{ "--accentColor": `var(--${type})` }}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default FlashMessages;
