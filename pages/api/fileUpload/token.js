import { GoogleSpreadsheet } from "google-spreadsheet";

export default async (req, res) => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_PRIVATE_KEY,
  });

  await doc.loadInfo();

  const dbxSheet = doc.sheetsByTitle("__dropbox_keys");

  const headers = await dbxSheet.loadHeaderRow(); // loads non-empty header row
  const rows = dropboxSheet.getRows();
  const firstRow = rows[0]; // only 1

  return res.status(200).json({ headers, firstRow });
};
