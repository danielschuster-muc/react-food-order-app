import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (options, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(options.url, {
        method: options.method ? options.method : "GET",
        headers: options.headers ? options.headers : {},
        body: options.body ? JSON.stringify(options.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }

    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};

export default useHttp;
