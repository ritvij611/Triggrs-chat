import { useState, useRef, useCallback } from 'react';

export const useResumableUpload = () => {
    const [uploadResponse, setUploadResponse] = useState(null);
    const [isUploadLoading, setIsUploadLoading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    // Create a ref to store controller so we can abort later
    const controllerRef = useRef(null);

    const handleUpload = useCallback(async (query) => {
        // Abort previous request if still in progress
        if (controllerRef.current) {
        controllerRef.current.abort();
        }

        const controller = new AbortController();
        controllerRef.current = controller;

        setIsUploadLoading(true);
        setUploadError(null);
        setUploadResponse(null);

        try {
            const { companyID, fileName, fileLength, fileType, binaryData } = query;
            const res = await fetch(`/api/templates/resumable-upload?companyID=${companyID}&fileName=${fileName}&fileLength=${fileLength}&fileType=${fileType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: controller.signal,
                body: binaryData
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw errorData?.message || 'Failed to Upload';
            }

            const result = await res.json();
            setUploadResponse(result);
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Request was aborted.');
            } else {
                console.error('Upload error:', err);
                setUploadError(err);
            }
        } finally {
            setIsUploadLoading(false);
        }
    }, []);

    const cancelUpload = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
    };

    return { uploadResponse, isUploadLoading, uploadError, handleUpload, cancelUpload };
};