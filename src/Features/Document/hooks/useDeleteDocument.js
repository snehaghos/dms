import { useState } from 'react';
import axiosClient from '../../../axios-client';

const useDeleteDocuments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteDocuments = async (ids) => {
    setLoading(true);
    setError(null);

    try {
      const promises = ids.map(id => axiosClient.delete(`http://localhost:8080/api/documents/delete/${id}`)); 
      await Promise.all(promises);
    } catch (err) {
      console.error('Error deleting documents:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteDocuments, loading, error };
};

export default useDeleteDocuments;
