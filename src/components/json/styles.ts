import styled from 'styled-components';

interface TextBlockProps {
  isSelected: boolean;
  label: string;
}

export const JsonViewer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StyledTextBlock = styled.span<TextBlockProps>`
  display: inline-block;
  background-color: ${({ isSelected }) => (isSelected ? 'yellow' : '#f0f0f0')};
  border-radius: 4px;
  padding: 6px;
  margin-left: ${({ label }) => {
    switch (label) {
      case 'page_header':
        return '0px';
      case 'section_header':
        return '10px';
      default:
        return '20px';
    }
  }};
`;

export const GroupBlock = styled.div`
  border-radius: 4px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
