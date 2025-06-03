import styled from 'styled-components';

export const PdfViewerContainer = styled.div``;

export const PdfPageContainer = styled.div`
  position: relative;
`;

export const PdfPageTextLayer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  opacity: 0.2;
  line-height: 1;

  & > span {
    color: transparent;
    position: absolute;
    white-space: pre;
    cursor: text;
    transform-origin: 0% 0%;
  }
`;

export const PdfPageHighlightContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
`;
