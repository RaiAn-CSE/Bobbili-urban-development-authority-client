import React from "react";
import toast from "react-hot-toast";

const DefaultDrawingFormat = () => {
  const downloadFile = (format, fileName) => {
    let data;
    if (format === "pdf") {
      data = JSON.stringify({
        fileName,
        fileId: "1Mque_-OWf28RiubAdE5Ll5CFWBnMPvUf",
      });
    } else if (format === "dwg") {
      data = JSON.stringify({
        fileName,
        fileId: "1xbOVy5XN5vb5Ka1eTlShSYz09VX7WS78",
      });
    }

    fetch(`http://localhost:5000/downloadFile?data=${data}`)
      .then((res) => {
        if (res.ok) {
          // If the response status is OK, it means the file download is successful
          return res.blob();
        } else {
          // If there's an error response, handle it accordingly
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
      })
      .then((blob) => {
        // Create a URL for the blob and trigger a download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName; // Set the desired file name and extension
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.log(err, "err");
        toast.error("Server Error");
      });
  };
  return (
    <div className="w-full h-full">
      <p className="text-black text-xl font-bold mt-10 text-center uppercase">
        Default Formats
      </p>
      <div className="flex justify-evenly items-center w-full min-h-[calc(100vh-70%)]">
        <button
          className="buttonDownload"
          onClick={() => {
            downloadFile("pdf", "Drawing-Model.pdf");
          }}
        >
          Drawing Format PDF
        </button>

        <button
          className="buttonDownload"
          onClick={() => {
            downloadFile("dwg", "Drawing.dwg");
          }}
        >
          AutoCad Drawing
        </button>
      </div>
    </div>
  );
};

export default DefaultDrawingFormat;
