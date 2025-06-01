import { useMemo, RefObject } from 'react';
import { JsonData, JsonElement, Text } from '../types/json';

interface GroupedContent {
  type: 'group' | 'text';
  data: Text | { groupRef: string; children: Text[] };
}

export const useGroupedContent = (
  jsonData: JsonData | null,
  refMap: RefObject<Map<string, JsonElement>>,
) => {
  return useMemo(() => {
    if (!jsonData) return [];

    const rendered = new Set<string>();
    const result: GroupedContent[] = [];

    jsonData.texts.forEach((text) => {
      const parentRef = text.parent?.$ref;
      const parent = refMap.current.get(parentRef);

      if (
        parent &&
        (parent.label === 'group' || parent.self_ref?.startsWith('#/groups/')) &&
        !rendered.has(parent.self_ref)
      ) {
        rendered.add(parent.self_ref);

        const groupChildren = (parent.children || [])
          .map((child: { $ref: string }) => refMap.current.get(child.$ref))
          .filter((item): item is Text => item !== undefined && 'text' in item);

        result.push({
          type: 'group',
          data: {
            groupRef: parent.self_ref,
            children: groupChildren,
          },
        });
      } else if (!parent || !parent.self_ref?.startsWith('#/groups/')) {
        result.push({
          type: 'text',
          data: text,
        });
      }
    });

    return result;
  }, [jsonData, refMap]);
};
