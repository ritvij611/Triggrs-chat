import { useState, useRef, useCallback } from 'react';

export const useFetchConversationMessages = () => {
  const [allConversationMessages, setAllConversationMessages] = useState([]);
  const [totalConversationMessages, setTotalConversationMessages] = useState();
  const [loadingConversationMessages, setLoadingConversationMessages] = useState(false);
  const [conversationMessageError, setConversationMessageError] = useState(null);

  // Create a ref to store controller so we can abort later
  const controllerRef = useRef(null);


  const fetchConversationMessages = useCallback(async ({phoneID, waID, limit, index}) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoadingConversationMessages(true);
    setConversationMessageError(null);
    try {
      const response = await fetch(`/api/conversations/messages/get-all?phoneID=${phoneID}&waID=${waID}&limit=${limit||10}&index=${index||0}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw errorData?.message || 'Failed to fetch ConversationMessages';
      }

      const result = await response.json();
      setAllConversationMessages(result.conversationMessages || []);
      setTotalConversationMessages(result.totalCount || 0);
      
      return result;
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request was aborted.');
      } else {
        console.error('ConversationMessages fetch error:', err);
        setConversationMessageError(err instanceof Error ? err.message : 'Failed to fetch ConversationMessages');
        throw err;
      }
    } finally {
      setLoadingConversationMessages(false);
    }
  }, []);

  const cancelConversationMessagesOperation = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  return { allConversationMessages, totalConversationMessages, loadingConversationMessages, conversationMessageError, fetchConversationMessages, cancelConversationMessagesOperation };
};
