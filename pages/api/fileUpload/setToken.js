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
  const activeRow = rows[0]; // only 1

  const now = new Date().toISOString();

  activeRow.token = `${now}-token`;
  activeRow.refreshToken = `${now}-refreshToken`;
  activeRow.status = `${now}-status`;
  activeRow.lastUpdated = now;
  await activeRow.save();

  return res.status(200).json({ message: "Tokens updated!" });
};
