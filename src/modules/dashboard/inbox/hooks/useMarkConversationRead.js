import { useState, useRef, useCallback } from 'react';

export const useMarkConversationRead = () => {
  const [loadingMark, setLoadingMark] = useState(false);
  const [markingError, setMarkingError] = useState(null);
  const [markReadResponse, setMarkReadResponse] = useState("")
  // Create a ref to store controller so we can abort later
  const controllerRef = useRef(null);


  const markConversationRead = useCallback(async ({phoneID, waID}) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoadingMark(true);
    setMarkingError(null);
    try {
      const response = await fetch(`/api/conversations/mark-read?phoneID=${phoneID}&waID=${waID}`, {
        signal: controller.signal,
        method: "POST"
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw errorData?.message || 'Failed to fetch Conversations';
      }

      const result = await response.json();
      setMarkReadResponse(result);
      
      return result;
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request was aborted.');
      } else {
        console.error('Conversations fetch error:', err);
        setMarkingError(err instanceof Error ? err.message : 'Failed to fetch Conversations');
        throw err;
      }
    } finally {
      setLoadingMark(false);
    }
  }, []);

  const cancelMarkingOperation = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  return { markReadResponse, loadingMark, markingError, markConversationRead, cancelMarkingOperation };
};
