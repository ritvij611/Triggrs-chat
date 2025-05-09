import { useState } from 'react';
import { toast } from 'sonner';

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    const handleRegister = async (data) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Registration failed');
            }

            setResponse(result);
            toast.success('Registration successful!');
            return result;
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        handleRegister,
        isLoading,
        error,
        response
    };
};
