const HIGHLIGHT_COLOR = 'rgba(24, 144, 255, 0.1)';
const HIGHLIGHT_BORDER = 'rgba(9, 109, 217)';

export const HORIZONTAL_GAP_THRESHOLD = 20;
export const PDF_SCALE = 1.0;

export const HIGHLIGHT_STYLE = `
.highlight {
  position: absolute;
  background-color: ${HIGHLIGHT_COLOR};
  border: 2px solid ${HIGHLIGHT_BORDER};
  pointer-events: none;
  display: none;
}
`;
