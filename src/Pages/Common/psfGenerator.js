import html2pdf from "html2pdf.js";
export const downloadPDF = (TargetComponent, containerRef) => {
  const container = containerRef.current;

  // Render your component inside the off-screen container
  // using the data passed as a prop
  ReactDOM.render(<TargetComponent />, container);

  // Configuration options for html2pdf
  const options = {
    margin: 10,
    filename: "component.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Generate and download the PDF
  html2pdf()
    .from(container)
    .set(options)
    .outputPdf((pdf) => {
      const blob = new Blob([pdf], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = options.filename;
      link.click();
    });

  // Clear the content from the off-screen container
  ReactDOM.unmountComponentAtNode(container);
};
