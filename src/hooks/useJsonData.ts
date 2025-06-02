import { useState, useRef, useEffect } from 'react';
import { JsonData, GroupItem, JsonElement } from '../types/json';

export const useJsonData = () => {
  const [jsonData, setJsonData] = useState<JsonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const elementRegistry = useRef<Map<string, JsonElement>>(new Map());

  const initializeRegistry = (data: JsonData) => {
    const map = elementRegistry.current;
    map.clear();

    const elements = [
      ...data.texts,
      ...data.pictures,
      ...data.tables,
      ...Object.values(data.groups),
      ...data.furniture.children.map(
        (child: { $ref: string }) =>
          ({
            self_ref: child.$ref,
            label: '',
            content_layer: 'body',
            name: '',
            parent: { $ref: '' },
            children: [],
          }) as GroupItem,
      ),
      { ...data.body, self_ref: data.body.self_ref },
    ] as JsonElement[];

    elements.forEach((el) => {
      if ('self_ref' in el && el.self_ref) {
        map.set(el.self_ref, el);
      }
    });
  };

  const fetchJsonData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/1.report.json');
      if (!response.ok) {
        throw new Error('Failed to fetch JSON data');
      }

      const data = await response.json();
      setJsonData(data);
      initializeRegistry(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch JSON data'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJsonData();
  }, []);

  return {
    jsonData,
    elementRegistry,
    isLoading,
    error,
    refetch: fetchJsonData,
  };
};
