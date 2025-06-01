import styled from 'styled-components';

interface TextBlockProps {
  isSelected: boolean;
  label: string;
}

export const StyledTextBlock = styled.span<TextBlockProps>`
  background-color: ${({ isSelected }) => (isSelected ? 'yellow' : 'transparent')};
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
