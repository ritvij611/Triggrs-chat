import { useState, useRef, useCallback } from 'react';

export const useFetchTemplates = () => {
  const [allTemplates, setAllTemplates] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [templateError, setTemplateError] = useState(null);

  // Create a ref to store controller so we can abort later
  const controllerRef = useRef(null);


  const fetchTemplates = useCallback(async ({companyID, limit, index, fields}) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoadingTemplates(true);
    setTemplateError(null);
    try {
      const response = await fetch(`/api/templates/get-all?companyID=${companyID}&limit=${limit||10}&index=${index||0}&fields=${fields||''}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw errorData?.message || 'Failed to fetch Templates';
      }

      const result = await response.json();
      setAllTemplates(result.templates || []);
      setTotalCount(result.totalCount || 0);
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

  return { allTemplates, totalCount, loadingTemplates, templateError, fetchTemplates, cancelTemplatesOperation };
};
