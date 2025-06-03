import { useState, useEffect } from 'react';
import { JsonData } from '../types/json';

const useJsonData = ({ jsonUrl }: { jsonUrl: string }) => {
  const [jsonData, setJsonData] = useState<JsonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchJsonData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(jsonUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch JSON data');
      }

      const data = await response.json();
      setJsonData(data);
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
    isLoading,
    error,
    refetch: fetchJsonData,
  };
};

export default useJsonData;
