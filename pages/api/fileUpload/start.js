import { Dropbox } from "dropbox";
import fetch from "cross-fetch";

const dbxConfig = {
  fetch,
  clientId: process.env.NEXT_PUBLIC_DROPBOX_CLIENT_ID,
  clientSecret: process.env.DROPBOX_CLIENT_SECRET,
};

// NOTE: also in /auth.js
const redirectUri = process.env.DROPBOX_REDIRECT_URL;

// first step for for admins to link are sent after linking w/ Dropbox from admin
// see example at https://github.com/dropbox/dropbox-sdk-js/blob/main/examples/javascript/simple-backend/code_flow_example.js
export default async (req, res) => {
  const { authenticated } = req.query;
  if (![true, "true", 1, "1"].includes(authenticated)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const dbx = new Dropbox(dbxConfig);
  const authUrl = await dbx.auth.getAuthenticationUrl(
    redirectUri,
    null,
    "code",
    "offline",
    null,
    "none",
    false
  );

  return res.redirect(302, authUrl);
};
