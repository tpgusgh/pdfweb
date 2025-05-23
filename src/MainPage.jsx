import React, { useState } from "react";
import styled from "styled-components";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import samplePDF from "./pdf/ch1.pdf";

export default function MainPage() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageScale, setPageScale] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Header><h1>C언어 PDF 모음</h1></Header>
      <div style={{ width: 1280, height: 720, overflow: "auto", marginTop: "80px" }}>
        <Document file={samplePDF} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} scale={pageScale} />
        </Document>
      </div>
    </div>
  );
}

const Header = styled.div`
  width: 100%;
  height: 10%;
  position: fixed;
  background-color: cornflowerblue;
  text-align: center;
  color: aliceblue;
`;
