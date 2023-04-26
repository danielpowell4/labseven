import { Dropbox } from "dropbox";
import fetch from "cross-fetch";

const dbxConfig = {
  fetch,
  clientId: process.env.NEXT_PUBLIC_DROPBOX_CLIENT_ID,
  clientSecret: process.env.DROPBOX_CLIENT_SECRET,
};

// TODO: peg me to domain
// NOTE: also in /start.js
const redirectUri = `http://localhost:3000/api/fileUpload/auth`;

// first step for for admins to link are sent after linking w/ Dropbox from __admin
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
