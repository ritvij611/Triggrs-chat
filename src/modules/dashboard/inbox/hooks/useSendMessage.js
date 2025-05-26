import { useState, useRef, useCallback } from 'react';

export const useSendMessage = () => {
    const [sendResponse, setSendResponse] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const [sendError, setSendError] = useState(null);

    // Send a ref to store controller so we can abort later
    const controllerRef = useRef(null);

    const handleSend = useCallback(async (query) => {
        // Abort previous request if still in progress
        if (controllerRef.current) {
        controllerRef.current.abort();
        }

        const controller = new AbortController();
        controllerRef.current = controller;

        setIsSending(true);
        setSendError(null);
        setSendResponse(null);

        try {            
            const res = await fetch(`/api/conversations/messages/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: controller.signal,
                body: JSON.stringify({...query})
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                
                throw errorData?.details?.message || 'Failed to Send';
            }

            const result = await res.json();
            if(query.imageURL){
                setSendResponse({...result, type: "image"});
            } else if(query.videoURL){
                setSendResponse({...result, type: "video"});
            } else if(query.docURL){
                setSendResponse({...result, type: "document"});
            } else {
                setSendResponse({...result, type: "text"});
            }
            
        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Request was aborted.');
            } else {
                console.error('Send Campaign error:', err);
                setSendError(err);
            }
        } finally {
            setIsSending(false);
        }
    }, []);

    const cancelSend = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
    };

    return { sendResponse, isSending, sendError, handleSend, cancelSend };
};