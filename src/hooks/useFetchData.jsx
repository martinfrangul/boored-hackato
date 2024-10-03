import { useState } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (response.status === 429) {
          setError('Too many requests. Please try again later.');
          return;
        }
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };


  return { data, loading, error, fetchData };
};

export default useFetchData;
