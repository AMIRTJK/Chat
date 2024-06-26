import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const DocumentPdf = ({ url, height }) => {
  const defaultScale = 0.7; // Установите желаемый масштаб, например, 0.8 для уменьшения

  return (
    <div className={`w-full ${height}`}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={url} defaultScale={defaultScale} />
      </Worker>
    </div>
  );
};

export default DocumentPdf;
