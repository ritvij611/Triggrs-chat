import { useState, useRef, useCallback } from 'react';

export const useFetchCompanies = () => {
  const [allCompanies, setAllCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a ref to store controller so we can abort later
  const controllerRef = useRef(null);


  const fetchCompanies = useCallback(async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/companies', {
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw errorData?.message || 'Failed to fetch companies';
      }

      const result = await response.json();
      setAllCompanies(result.companies || []);
      return result;
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request was aborted.');
      } else {
        console.error('Companies fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch companies');
        throw err;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelOperation = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  return {
    allCompanies,
    loading,
    error,
    fetchCompanies,
    cancelOperation
  };
};
