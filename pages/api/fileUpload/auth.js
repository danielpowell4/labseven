import { GoogleSpreadsheet } from "google-spreadsheet";

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

  // save to google sheets
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_PRIVATE_KEY,
  });

  await doc.loadInfo();
  const dbxSheet = doc.sheetsByTitle["__dropbox_keys"];

  const rows = await dbxSheet.getRows();
  const activeRow = rows[0]; // only 1
  applyTokens(activeRow, result);
  await activeRow.save();

  return res.status(200).json({ message: "Account has been linked!" });
};
