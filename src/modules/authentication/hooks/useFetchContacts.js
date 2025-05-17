import { useState, useRef, useCallback } from 'react';

export const useFetchContacts = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [totalContacts, setTotalContacts] = useState();
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [contactError, setContactError] = useState(null);

  // Create a ref to store controller so we can abort later
  const controllerRef = useRef(null);


  const fetchContacts = useCallback(async ({companyID, limit, index}) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoadingContacts(true);
    setContactError(null);
    try {
      const response = await fetch(`/api/contacts/get-all?companyID=${companyID}&limit=${limit||10}&index=${index||0}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw errorData?.message || 'Failed to fetch Contacts';
      }

      const result = await response.json();
      setAllContacts(result.Contacts || []);
      setTotalContacts(result.totalCount || 0);
      return result;
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request was aborted.');
      } else {
        console.error('Contacts fetch error:', err);
        setContactError(err instanceof Error ? err.message : 'Failed to fetch Contacts');
        throw err;
      }
    } finally {
      setLoadingContacts(false);
    }
  }, []);

  const cancelContactsOperation = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  return { allContacts, totalContacts, loadingContacts, contactError, fetchContacts, cancelContactsOperation };
};
