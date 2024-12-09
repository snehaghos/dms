import { useState, useEffect } from 'react';
import axiosClient from '../../../axios-client';

const useDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axiosClient.get('http://localhost:8080/api/documents/userToken');
        if (Array.isArray(response.data)) {
          setDocuments(response.data);
        } else {
          setDocuments([response.data]);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const uploadCroppedImage = async (croppedBlob) => {
    const formData = new FormData();
    formData.append('files', croppedBlob, 'cropped-image.jpg');

    try {
      const response = await axiosClient.post('http://localhost:8080/api/documents/upload', formData);
      console.log('Uploaded cropped image:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error uploading cropped image:', error);
      throw error;
    }
  };

  return { documents, setDocuments, uploadCroppedImage, loading, error };
};

export default useDocument;
