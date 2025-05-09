import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

/**
 * Reusable data fetcher component with consistent loading UI
 * @param {Object} props
 * @param {string} props.endpoint - API endpoint to fetch data from
 * @param {Array|Object} props.initialData - Initial data while loading
 * @param {number} props.skeletonCount - Number of skeleton items to display
 * @param {Function} props.children - Render function for the data
 * @param {Function} props.renderSkeleton - Custom skeleton rendering function (optional)
 * @param {string} props.errorMessage - Custom error message (optional)
 * @param {boolean} props.showToast - Whether to show toast notifications (optional)
 * @param {Function} props.transformData - Function to transform API response (optional)
 * @param {string} props.dataKey - Key to extract from API response (optional)
 */
function DataFetcher({
  endpoint,
  initialData = [],
  skeletonCount = 6,
  children,
  renderSkeleton,
  errorMessage = "Failed to fetch data",
  showToast = true,
  transformData,
  dataKey,
  method = "GET",
  body
}) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const requestOptions = {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
        };
        
        if (method !== "GET" && body) {
          requestOptions.body = JSON.stringify(body);
        }
        
        const response = await fetch(endpoint, requestOptions);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || errorMessage);
        }

        const result = await response.json();
        
        // Extract data if a specific key is provided
        const processedData = dataKey ? result[dataKey] : result;
        
        // Transform data if a transform function is provided
        const finalData = transformData ? transformData(processedData) : processedData;
        
        setData(finalData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        if (showToast) {
          toast.error(err instanceof Error ? err.message : errorMessage);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, errorMessage, showToast, transformData, dataKey, method, body]);

  // Default skeleton that matches the company card layout
  const defaultSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div 
          key={index} 
          className="bg-white hover:shadow-md transition-all duration-300 p-4 border flex justify-between rounded-lg items-center border-gray-200 cursor-pointer"
        >
          <div className="flex gap-x-3 items-center">
            <div className="bg-emerald-50 p-2 rounded-lg shadow-sm">
              <Skeleton className="w-6 h-6" />
            </div>
            <div>
              <Skeleton className="w-32 h-4" />
            </div>
          </div>
          <Skeleton className="w-24 h-6" />
        </div>
      ))}
    </div>
  );

  if (error) {
    return (
      <div className="col-span-3 text-center py-8 text-gray-500">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return renderSkeleton ? renderSkeleton() : defaultSkeleton();
  }

  return children(data, isLoading);
}

export default DataFetcher;