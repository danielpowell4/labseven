import { GoogleSpreadsheet } from "google-spreadsheet";

export default async (req, res) => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_PRIVATE_KEY,
  });

  await doc.loadInfo();
  const dbxSheet = doc.sheetsByTitle["__dropbox_keys"];
  const rows = await dbxSheet.getRows();
  const activeRow = rows[0];
  const asRes = {};

  const headers = ["token", "refreshToken", "status", "lastUpdated"];

  headers.forEach((header) => (asRes[header] = activeRow[header]));

  return res.status(200).json(asRes);
};
