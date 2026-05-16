import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(url + `?t=${Date.now()}`)
      .then(res => res.json())
      .then(setData);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, refetch: fetchData };
}

export default useFetch;