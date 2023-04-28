import * as React from "react";

import { Dropbox } from "dropbox";
import { useDropzone } from "react-dropzone";

import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024; // 150 Mb

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

const useFileUpload = (name, addAttachment) => {
  // load access token from server
  const [data, setData] = React.useState({ state: "idle" });
  const accessToken = React.useRef();
  const tokenQuery = useSWR("/api/fileUpload/getToken", fetcher);

  React.useEffect(() => {
    if (data.state !== "idle") return; // already updated
    if (!tokenQuery.data?.token) return; // no token yet

    setData({ state: "readyForUpload" });
  }, [tokenQuery, data]);

  React.useEffect(() => {
    if (!tokenQuery.data?.token) return; // no token yet

    accessToken.current = tokenQuery.data.token;
  }, [tokenQuery.data?.token]);

  const onDrop = React.useCallback(
    async (acceptedFiles) => {
      setData({ state: "loading", message: "Starting upload..." });

      if (!accessToken.current) {
        setData({
          state: "error",
          message:
            "File upload is currently offline. Please refresh and try again. If this continues, please contact our team.",
        });
        return;
      }

      const dropbox = new Dropbox({ accessToken: accessToken.current });
      const folderName = name || "Name Missing When Upload Started";

      const today = new Date();
      const UPLOAD_PATH = [
        "",
        `${MonthNameMap[today.getMonth()]} ${today.getFullYear()}`,
        folderName,
        "",
      ].join("/");

      try {
        for (let i = 0; i < acceptedFiles.length; i++) {
          const file = acceptedFiles[i];
          setData({
            state: "loading",
            message: `Uploading file #${i + 1} name: ${file.name}`,
          });
          await uploadFile(dropbox, UPLOAD_PATH, file);
          addAttachment(file.name);
        }
        setData({
          state: "success",
          message: "Upload complete!",
        });
      } catch (error) {
        console.error(error);
        setData({
          state: "error",
          message: "Upload failed! check console for details",
        });
      }
    },
    [name, addAttachment]
  );

  const dropzone = useDropzone({ onDrop });

  return [data, dropzone];
};

export default useFileUpload;
