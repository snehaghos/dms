import React, { useState, useEffect } from 'react';
import axiosClient from '../../../axios-client';
import DocumentFilter from './DocumentFilter';
import ImageModal from './ImageModal';

const DocumentIndex = () => {
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axiosClient.get(`http://localhost:8080/api/documents/userToken`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setDocuments(response.data);
        } else {
          setDocuments([response.data]);
        }
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
      });
  }, []);

  const handleFilter = (filteredDocuments) => {
    setDocuments(filteredDocuments);
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={`pt-24 px-8 bg-gray-100 min-h-screen `}>
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Uploaded Documents</h1>

      <DocumentFilter onFilter={handleFilter} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {documents.length > 0 ? (
          documents.map((item, index) => (
            <div
              className="relative overflow-hidden  cursor-pointer"
              key={index}
              onClick={() => openModal(item.url)}
            >
              {
                item.mime_type.includes("image/") &&
                <img
                  src={item.url}
                  alt={`Uploaded Image ${index + 1}`}
                  className={`h-full w-full object-cover 
                              ${index % 4 === 0 ? 'h-64' : 'h-48'} 
                              ${index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                />
              }

              {
                item.mime_type === "application/pdf" &&
                <object data={item.url} type="application/pdf" className="h-full w-full">
                  <img
                    src="https://www.science.co.il/internet/browsers/PDF-doc-256.png"
                    alt="PDF Document"
                    className="h-full w-full object-contain"
                  />
                </object>
              }
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-xl">No documents found</p>
        )}
      </div>

      <ImageModal
        isOpen={isModalOpen}
        imageUrl={selectedImage}
        onClose={closeModal}
      />
    </div>
  );
};

export default DocumentIndex;
