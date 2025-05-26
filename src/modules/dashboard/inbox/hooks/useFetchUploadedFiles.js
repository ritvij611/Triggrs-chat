import { useState, useRef, useCallback } from 'react';

export const useFetchUploadedFiles = () => {
  const [allFiles, setAllFiles] = useState({});
  const [totalFiles, setTotalFiles] = useState();
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [fileError, setFileError] = useState(null);

  // Create a ref to store controller so we can abort later
  const controllerRef = useRef(null);


  const fetchFiles = useCallback(async ({companyID, category, limit, index}) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoadingFiles(true);
    setFileError(null);
    try {
      const response = await fetch(`/api/files/get-all?companyID=${companyID}&category=${category}&limit=${limit||10}&index=${index||0}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw errorData?.message || 'Failed to fetch Files';
      }

      const result = await response.json();
      setAllFiles({files: result.uploadedFiles || [], category });
      setTotalFiles(result.totalCount || 0);
      
      return result;
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request was aborted.');
      } else {
        console.error('Files fetch error:', err);
        setFileError(err instanceof Error ? err.message : 'Failed to fetch Files');
        throw err;
      }
    } finally {
      setLoadingFiles(false);
    }
  }, []);

  const cancelFilesOperation = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  return { allFiles, totalFiles, loadingFiles, fileError, fetchFiles, cancelFilesOperation };
};
