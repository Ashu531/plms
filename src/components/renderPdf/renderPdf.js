import React, { useState, useEffect, useRef } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

// Ensure workerSrc is set
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function RenderPDF({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const canvasRef = useRef(null);  // Using a ref to target the canvas element

  useEffect(() => {
    const loadingTask = getDocument(fileUrl);
    loadingTask.promise.then((pdf) => {
      setNumPages(pdf.numPages);
      pdf.getPage(pageNumber).then((page) => {
        const viewport = page.getViewport({ scale: 1 });
        const canvas = canvasRef.current; // Reference the canvas using ref
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        page.render(renderContext);
      });
    }).catch(err => console.error('Error loading PDF:', err));
  }, [fileUrl, pageNumber]); // Re-run when fileUrl or pageNumber changes

  return <canvas ref={canvasRef} />;
}
