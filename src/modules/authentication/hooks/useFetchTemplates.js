import { useState, useRef, useCallback } from 'react';

export const useFetchTemplates = () => {
  const [allTemplates, setAllTemplates] = useState([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [templateError, setTemplateError] = useState(null);

  // Create a ref to store controller so we can abort later
  const controllerRef = useRef(null);


  const fetchTemplates = useCallback(async (query) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoadingTemplates(true);
    setTemplateError(null);
    const {companyID} = query;
    try {
      const response = await fetch(`/api/templates/get-all?companyID=${companyID}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw errorData?.message || 'Failed to fetch Templates';
      }

      const result = await response.json();
      setAllTemplates(result.templates || []);
      return result;
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request was aborted.');
      } else {
        console.error('Templates fetch error:', err);
        setTemplateError(err instanceof Error ? err.message : 'Failed to fetch Templates');
        throw err;
      }
    } finally {
      setLoadingTemplates(false);
    }
  }, []);

  const cancelTemplatesOperation = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  return { allTemplates, loadingTemplates, templateError, fetchTemplates, cancelTemplatesOperation };
};
