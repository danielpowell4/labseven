"use server";

import styles from "app/admin/admin.module.css";
import { cookies } from "next/headers";

const FlashMessages = async () => {
  const cookieStore = cookies();

  const messages = ["success", "error", "warning", "info"]
    .flatMap((key) => {
      const messageOrMessages = cookieStore.get(`flash:${key}`)?.value;

      if (!messageOrMessages) return [];
      if (Array.isArray(messageOrMessages)) {
        return messageOrMessages.map((message) => ({
          type: key,
          message,
        }));
      }

      return [{ type: key, message: messageOrMessages }];
    })
    .filter(({ message }) => Boolean(message));

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
