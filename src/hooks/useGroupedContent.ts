import { useMemo, RefObject } from 'react';
import { JsonData, JsonElement, Text, Table, Picture } from '../types/json';

interface GroupedContent {
  type: 'group' | 'text' | 'table' | 'picture';
  data: Text | { groupRef: string; children: Text[] } | Table | Picture;
  selfRef: string;
}

export const useGroupedContent = (
  jsonData: JsonData | null,
  refMap: RefObject<Map<string, JsonElement>>,
) => {
  return useMemo(() => {
    if (!jsonData) return [];

    const rendered = new Set<string>();
    const contentMap = new Map<string, GroupedContent>();

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

        contentMap.set(parent.self_ref, {
          type: 'group',
          data: {
            groupRef: parent.self_ref,
            children: groupChildren,
          },
          selfRef: parent.self_ref,
        });
      } else if (!parent || !parent.self_ref?.startsWith('#/groups/')) {
        contentMap.set(text.self_ref, {
          type: 'text',
          data: text,
          selfRef: text.self_ref,
        });
      }
    });

    if (jsonData.tables) {
      jsonData.tables.forEach((table) => {
        contentMap.set(table.self_ref, {
          type: 'table',
          data: table,
          selfRef: table.self_ref,
        });
      });
    }

    if (jsonData.pictures) {
      jsonData.pictures.forEach((picture) => {
        contentMap.set(picture.self_ref, {
          type: 'picture',
          data: picture,
          selfRef: picture.self_ref,
        });
      });
    }

    const result: GroupedContent[] = [];
    jsonData.body.children.forEach((child) => {
      const content = contentMap.get(child.$ref);
      if (content) {
        result.push(content);
      }
    });

    return result;
  }, [jsonData, refMap]);
};
