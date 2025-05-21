import { useState, useRef, useCallback } from 'react';

export const useFetchConversations = () => {
  const [allConversations, setAllConversations] = useState([]);
  const [totalConversations, setTotalConversations] = useState();
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [conversationError, setConversationError] = useState(null);

  // Create a ref to store controller so we can abort later
  const controllerRef = useRef(null);


  const fetchConversations = useCallback(async ({phoneID, limit, index}) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoadingConversations(true);
    setConversationError(null);
    try {
      const response = await fetch(`/api/conversations/get-all?phoneID=${phoneID}&limit=${limit||10}&index=${index||0}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw errorData?.message || 'Failed to fetch Conversations';
      }

      const result = await response.json();
      setAllConversations(result.conversations || []);
      setTotalConversations(result.totalCount || 0);
      
      return result;
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request was aborted.');
      } else {
        console.error('Conversations fetch error:', err);
        setConversationError(err instanceof Error ? err.message : 'Failed to fetch Conversations');
        throw err;
      }
    } finally {
      setLoadingConversations(false);
    }
  }, []);

  const cancelConversationsOperation = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  return { allConversations, totalConversations, loadingConversations, conversationError, fetchConversations, cancelConversationsOperation };
};
