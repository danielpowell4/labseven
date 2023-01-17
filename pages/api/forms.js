import { GoogleSpreadsheet } from "google-spreadsheet";

export default async (req, res) => {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_PRIVATE_KEY,
  });

  await doc.loadInfo();

  console.log("req.body", req.body);
  const { __title, ...fields } = req.body;
  const sheet = doc.sheetsByTitle[__title];

  await sheet.addRow({ ...fields, addedOn: new Date().toISOString() });

  return res.status(200).json({ message: "Submission recorded!" });
};
