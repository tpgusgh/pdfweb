import React, { useState } from "react";
import styled from "styled-components";
import { Document, Page, pdfjs } from "react-pdf";

// Set the worker source to the public folder
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>PDF 렌더링 중 오류 발생</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function MainPage() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageScale, setPageScale] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Header>
        <h1>C언어 PDF 모음</h1>
      </Header>
      <div
        style={{
          width: 1280,
          height: 720,
          overflow: "auto",
          marginTop: "80px",
        }}
      >
      {/* 여기는 주석 */}
        <ErrorBoundary>
          <Document
            file="/pdf/ch1.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.error("Error loading PDF:", error)}
          >
            <Page
              pageNumber={pageNumber}
              scale={pageScale}
              onRenderError={(error) => console.error("Error rendering page:", error)}
            />
          </Document>
        </ErrorBoundary>
      </div>
    </div>
  );
}

const Header = styled.div`
  width: 100%;
  height: 80px;
  position: fixed;
  background-color: cornflowerblue;
  text-align: center;
  color: aliceblue;
  z-index: 1000;
`;