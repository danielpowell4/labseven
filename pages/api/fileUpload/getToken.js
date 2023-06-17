import { kv } from "@vercel/kv";
import { Dropbox } from "dropbox";

import fetch from "cross-fetch";
import { applyTokens } from "lib/utils";
import { stringify } from "qs";

// https://dropbox.com/developers/documentation/http/documentation#oauth2-token
// https://github.com/dropbox/dropbox-sdk-js/blob/44dd638cc5fc6d55fd895047b6de43008e799313/src/auth.js#L357-L394
const refreshDropboxToken = async (dropboxBlob) => {
  let nextToken;

  if (dropboxBlob.refreshToken) {
    try {
      const params = {
        grant_type: "refresh_token",
        refresh_token: dropboxBlob.refreshToken,
        client_id: process.env.NEXT_PUBLIC_DROPBOX_CLIENT_ID,
        client_secret: process.env.DROPBOX_CLIENT_SECRET,
      };
      const refreshRes = await fetch(
        `https://api.dropbox.com/oauth2/token?${stringify(params)}`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
        }
      );
      const result = await refreshRes.json();
      if (!refreshRes.ok) {
        throw new Error(`refreshDropboxToken error: ${JSON.stringify(result)}`);
      }
      applyTokens(dropboxBlob, result);
      await kv.set("__dropbox_keys", dropboxBlob);
      console.log("- successfully refreshed dropbox token");
      nextToken = dropboxBlob.token;
    } catch (refreshError) {
      console.log("- failed to refresh dropbox token");
      console.error(refreshError);
    }
  } else {
    console.error("- no refresh token found");
  }

  return nextToken;
};

export default async (req, res) => {
  const kvDropboxBlob = (await kv.get("__dropbox_keys")) ?? {};
  let token;

  try {
    // check if token valid
    // send query, if returned w/ 200 + same query, all good
    const dbx = new Dropbox({ accessToken: kvDropboxBlob["token"] });
    const sendQuery = { query: "handshake" };
    const checkRes = await dbx.checkUser(sendQuery);
    if (checkRes.status === 200 && checkRes.result.result === "handshake") {
      console.log("- current dropbox token is valid");
      token = kvDropboxBlob["token"];
    } else {
      throw new Error(
        `- current dropbox token invalid per ${JSON.stringify(checkRes)}`
      );
    }
  } catch (error) {
    // is missing or is NOT valid
    if (error?.status === 401) {
      // 401's => try refresh
      console.log(" - token has expired or been revoked");
      token = await refreshDropboxToken(kvDropboxBlob);
    } else {
      console.error("- error is not 401", error);
    }
  }

  return res.status(200).json({ token });
};
