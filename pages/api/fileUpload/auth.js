import { kv } from "@vercel/kv";
import { Dropbox } from "dropbox";
import fetch from "cross-fetch";
import { applyTokens } from "lib/utils";

const dbxConfig = {
  fetch,
  clientId: process.env.NEXT_PUBLIC_DROPBOX_CLIENT_ID,
  clientSecret: process.env.DROPBOX_CLIENT_SECRET,
};

// NOTE: also in /start.js
const redirectUri = process.env.DROPBOX_REDIRECT_URL;

// where admins are sent after linking w/ Dropbox from __admin
// see example at https://github.com/dropbox/dropbox-sdk-js/blob/main/examples/javascript/simple-backend/code_flow_example.js
export default async (req, res) => {
  // exchange code for token
  const { code } = req.query;
  const dbx = new Dropbox(dbxConfig);
  const { result } = await dbx.auth.getAccessTokenFromCode(redirectUri, code);

  // save to kv store
  const kvDropboxBlob = (await kv.get("__dropbox_keys")) ?? {};
  applyTokens(kvDropboxBlob, result);
  await kv.set("__dropbox_keys", kvDropboxBlob);

  return res.status(200).json({
    message: "Account has been linked! You can safely close this tab.",
  });
};
