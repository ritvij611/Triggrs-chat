import { useState, useRef, useCallback } from 'react';

export const useLogin = () => {
  const [loginResponse, setLoginResponse] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // Create a ref to store controller so we can abort later
  const controllerRef = useRef(null);

  const handleLogin = useCallback(async (query) => {
    // Abort previous request if still in progress
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setIsLoginLoading(true);
    setLoginError(null);
    setLoginResponse(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
        body: JSON.stringify({...query}),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw errorData?.message || 'Failed to Login';
      }

      const result = await res.json();
      setLoginResponse(result);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request was aborted.');
      } else {
        console.error('Flight search error:', err);
        setLoginError(err);
      }
    } finally {
      setIsLoginLoading(false);
    }
  }, []);

  const cancelLogin = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  return { loginResponse, isLoginLoading, loginError, handleLogin, cancelLogin };
};