import { HORIZONTAL_GAP_THRESHOLD } from '@/commons/pdf';
import { TextItem, TextMarkedContent } from 'pdfjs-dist/types/src/display/api';

export const getTextItems = (items: (TextItem | TextMarkedContent)[]): TextItem[] => {
  return items
    .filter((item): item is TextItem => 'str' in item && item.str.trim() !== '')
    .reduce((acc: TextItem[], item: TextItem) => {
      const lastGroup = acc[acc.length - 1];
      if (!lastGroup) return [item];

      const horizontalGap = item.transform[4] - (lastGroup.transform[4] + lastGroup.width);
      if (
        lastGroup &&
        lastGroup.transform[5] === item.transform[5] &&
        horizontalGap < HORIZONTAL_GAP_THRESHOLD
      ) {
        lastGroup.str += item.str;
        lastGroup.width += item.width;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);
};
