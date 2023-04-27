import * as React from "react";
import Head from "next/head";

import { Button, Layout } from "../components";

import useFileUpload from "lib/useFileUpload";

export async function getStaticProps() {
  return { props: {} };
}

const Upload = () => {
  const [name, setName] = React.useState("Test Name");
  const [attachments, setAttachments] = React.useState([]);
  const addAttachment = React.useCallback((attachment) => {
    setAttachments((prev) => [...prev, attachment]);
  });
  const [data, onInputChange] = useFileUpload(addAttachment);

  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{ maxWidth: 660, margin: "3rem auto" }}>
        <h1>Dropbox File Upload</h1>
        <p>This page is intended as a sandbox for testing the Dropbox API.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("You submitted somehow?!");
          }}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="fileUpload">File Upload</label>
          <input
            type="file"
            id="fileUpload"
            onChange={(e) => onInputChange(name, e)}
            multiple
            required
          />
          <pre>attachments: {JSON.stringify(attachments, null, 2)}</pre>
        </form>

        <hr />

        <details open>
          <summary>Upload state</summary>
          <pre>data: {JSON.stringify(data, null, 2)}</pre>
        </details>
      </div>
    </Layout>
  );
};

export default Upload;
