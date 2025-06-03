import { useMemo } from 'react';
import { JsonData, JsonElement, Text, Table } from '../types/json';

interface GroupData {
  groupRef: string;
  children: Text[];
}

type Content =
  | { type: 'group'; data: GroupData; selfRef: string }
  | { type: 'text'; data: Text; selfRef: string }
  | { type: 'table'; data: Table; selfRef: string };

const useJsonDataParsing = (jsonData: JsonData | null) => {
  const initializeSelfRefMap = (data: JsonData) => {
    console.log('🚀 ~ initializeSelfRefMap ~ data:', data);
    const map = new Map<string, JsonElement>();
    map.clear();

    const elementContents = [
      ...data.texts,
      ...data.pictures,
      ...data.tables,
      ...Object.values(data.groups),
      ...data.furniture.children.map((child: { $ref: string }) => ({
        self_ref: child.$ref,
        label: '',
        content_layer: 'body',
        name: '',
        parent: { $ref: '' },
        children: [],
      })),
      { ...data.body, self_ref: data.body.self_ref },
    ] as JsonElement[];

    elementContents.forEach((el) => {
      if ('self_ref' in el && el.self_ref) {
        map.set(el.self_ref, el);
      }
    });

    return map;
  };

  return useMemo(() => {
    if (!jsonData) return [];

    const rendered = new Set<string>();
    const selfRefMap = initializeSelfRefMap(jsonData);
    const contentMap = new Map<string, Content>();

    jsonData.texts.forEach((text) => {
      const parentRef = text.parent?.$ref;
      const parent = selfRefMap.get(parentRef);

      if (
        parent &&
        (parent.label === 'group' || parent.self_ref?.startsWith('#/groups/')) &&
        !rendered.has(parent.self_ref)
      ) {
        rendered.add(parent.self_ref);

        const groupChildren = (parent.children || [])
          .map((child: { $ref: string }) => selfRefMap.get(child.$ref))
          .filter((item): item is Text => item !== undefined && 'text' in item);

        contentMap.set(parent.self_ref, {
          type: 'group',
          data: {
            groupRef: parent.self_ref,
            children: groupChildren,
          },
          selfRef: parent.self_ref,
        });
      } else if (
        parent &&
        (parent.label === 'group' || parent.self_ref?.startsWith('#/pictures/'))
      ) {
        contentMap.set(text.parent.$ref, {
          type: 'text',
          data: text,
          selfRef: text.self_ref,
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

    const result: Content[] = [];
    jsonData.body.children.forEach((child) => {
      const content = contentMap.get(child.$ref);
      if (content) {
        result.push(content);
      }
    });

    return result;
  }, [jsonData]);
};

export default useJsonDataParsing;
