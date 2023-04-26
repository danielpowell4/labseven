import * as React from "react";
import Head from "next/head";

import { Button, Layout } from "../components";

import { Dropbox } from "dropbox";

import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export async function getStaticProps() {
  return { props: {} };
}

const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;

const MonthNameMap = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

/** from https://github.com/dropbox/dropbox-sdk-js/blob/main/examples/javascript/upload/index.html */
const uploadFile = async (dropbox, path, file) => {
  if (file.size < UPLOAD_FILE_SIZE_LIMIT) {
    // File is smaller than 150 Mb - use filesUpload API

    return dropbox
      .filesUpload({ path: path + file.name, contents: file })
      .then(function (response) {
        console.log("upload success", response);
      });
  } else {
    // File is bigger than 150 Mb - use filesUploadSession* API

    const maxBlob = 8 * 1000 * 1000; // 8Mb - Dropbox JavaScript API suggested max file / chunk size
    const workItems = [];
    let offset = 0;

    while (offset < file.size) {
      var chunkSize = Math.min(maxBlob, file.size - offset);
      workItems.push(file.slice(offset, offset + chunkSize));
      offset += chunkSize;
    }

    const bigFileTask = workItems.reduce((acc, blob, idx, items) => {
      if (idx == 0) {
        // Starting multipart upload of file
        return acc.then(function () {
          return dropbox
            .filesUploadSessionStart({ close: false, contents: blob })
            .then((response) => response.session_id);
        });
      } else if (idx < items.length - 1) {
        // Append part to the upload session
        return acc.then((sessionId) => {
          const cursor = { session_id: sessionId, offset: idx * maxBlob };
          return dropbox
            .filesUploadSessionAppendV2({
              cursor: cursor,
              close: false,
              contents: blob,
            })
            .then(() => sessionId);
        });
      } else {
        // Last chunk of data, close session
        return acc.then(function (sessionId) {
          const cursor = {
            session_id: sessionId,
            offset: file.size - blob.size,
          };
          const commit = {
            path: path + file.name,
            mode: "add",
            autorename: true,
            mute: false,
          };
          return dropbox.filesUploadSessionFinish({
            cursor: cursor,
            commit: commit,
            contents: blob,
          });
        });
      }
    }, Promise.resolve()); // start w/ promise chain

    return bigFileTask.then(function (bigFileResponse) {
      console.log("bigFileResponse", bigFileResponse);
    });
  }
};

const Upload = () => {
  const [data, setData] = React.useState("Idle");
  const tokenQuery = useSWR("/api/fileUpload/getToken", fetcher);

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the page from refreshing

    setData("Upload started!");

    const formEl = e.currentTarget;
    const companyName = formEl.elements.companyName.value ?? "no-company-name";
    const fileInput = formEl.elements.fileUpload;
    const dropbox = new Dropbox({
      accessToken: tokenQuery.data?.token,
    });

    const today = new Date();
    const UPLOAD_PATH = [
      "",
      "__test",
      `${MonthNameMap[today.getMonth()]} ${today.getFullYear()}`,
      companyName,
      "",
    ].join("/");

    try {
      for (let i = 0; i < fileInput.files.length; i++) {
        const file = fileInput.files[i];
        setData(`file #${i + 1} name: ${file.name} size: ${file.size}`);
        await uploadFile(dropbox, UPLOAD_PATH, file);
        setData(
          `Upload complete! Check Dropbox App folder for: ${UPLOAD_PATH}`
        );
      }
    } catch (error) {
      console.error(error);
      setData("Upload failed! check console for details");
    }
  };

  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{ maxWidth: 660, margin: "3rem auto" }}>
        <h1>Dropbox File Upload</h1>
        <p>This page is intended as a sandbox for testing the Dropbox API.</p>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <label htmlFor="companyName">Company Name</label>
          <input type="text" id="companyName" name="companyName" required />

          <label htmlFor="fileUpload">File Upload</label>
          <input type="file" id="fileUpload" multiple required />

          <Button type="submit" style={{ maxWidth: 220 }}>
            Upload File
          </Button>
        </form>

        <hr />

        <details open>
          <summary>Dev Helper</summary>
          <pre>data: {JSON.stringify(data, null, 2)}</pre>
        </details>

        <details open>
          <summary>tokenQuery</summary>
          <pre>{JSON.stringify(tokenQuery)}</pre>
        </details>
      </div>
    </Layout>
  );
};

export default Upload;
