import { Document, Page, Text } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { useReactToPdf } from "react-to-pdf";

const GoogleDrivePdfViewer = ({ url }) => {
  const [pdfUrl, setPdfUrl] = useState(""); // Google Drive link to your PDF file
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { toPdf } = useReactToPdf();

  // Fetch the PDF from Google Drive link
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const dataUrl = URL.createObjectURL(blob);
        setPdfUrl(dataUrl);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPdf();
  }, [url]);

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleDownload = async () => {
    await toPdf(
      <Document>
        <Page>
          <Text>
            This is a PDF document generated from a Google Drive link.
          </Text>
          {/* Add more components as needed */}
        </Page>
      </Document>
    );
  };

  return (
    <div>
      {pdfUrl && (
        <Document file={pdfUrl} onLoadSuccess={handleLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      )}
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default GoogleDrivePdfViewer;
