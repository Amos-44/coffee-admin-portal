import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);

    fetch(url + `?t=${Date.now()}`)
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, refetch: fetchData };
}

export default useFetch;