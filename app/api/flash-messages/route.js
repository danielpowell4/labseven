import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(_req) {
  console.log("GET /api/flash-messages");

  const cookieStore = cookies();

  const eatCookie = (key) => {
    if (cookieStore.has(key)) {
      const value = cookieStore.get(key)?.value;
      cookieStore.delete(key);
      return value;
    }
  };

  const messages = ["success", "error", "warning", "info"]
    .flatMap((key) => {
      const messageOrMessages = eatCookie(`flash:${key}`);

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

  return NextResponse.json({ messages });
}
