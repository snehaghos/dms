import React, { useState } from 'react';
import useDocument from '../hooks/useDocument';
import useDeleteDocuments from '../hooks/useDeleteDocument';
import DocumentFilter from './DocumentFilter';
import ImageModal from './ImageModal';



const DocumentIndex = () => {
  const { documents, setDocuments, uploadCroppedImage, loading, error } = useDocument();
  const { deleteDocuments, loading: deleteLoading, error: deleteError } = useDeleteDocuments();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleSaveImage = async (croppedBlob) => {
    try {
      const uploadedImage = await uploadCroppedImage(croppedBlob);
      await updateDocument(selectedImage, uploadedImage.url);
      closeModal();
    } catch (error) {
      console.error('Error uploading and updating image:', error);
    }
  };

  const handleSaveCroppedImage = async (croppedBlob) => {
    try {
      const uploadedImage = await uploadCroppedImage(croppedBlob);
      console.log('Uploaded cropped image:', uploadedImage);
    } catch (error) {
      console.error('Error uploading cropped image:', error);
    }
  };

  const handleDeleteSelectedDocuments = async () => {
    const idsToDelete = Array.from(selectedIds);
    if (idsToDelete.length === 0) return;

    try {
      await deleteDocuments(idsToDelete);
      setDocuments(prevDocuments => prevDocuments.filter(doc => !idsToDelete.includes(doc.id)));
      setSelectedIds(new Set());
    } catch (error) {
      console.error('Error deleting documents:', error);
    }
  };

  const toggleSelectDocument = (id) => {
    setSelectedIds(prevSelectedIds => {
      const newSelectedIds = new Set(prevSelectedIds);
      if (newSelectedIds.has(id)) {
        newSelectedIds.delete(id);
      } else {
        newSelectedIds.add(id);
      }
      return newSelectedIds;
    });
  };

  if (loading || deleteLoading) return <p>Loading documents...</p>;
  if (error || deleteError) return <p>Error fetching documents: {error?.message || deleteError.message}</p>;

  return (
    <div className="pt-24 px-8 bg-gray-100 min-h-screen overflow-hidden">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Uploaded Documents</h1>

      <div className='flex gap-6 justify-center items-center py-10'>
        <DocumentFilter onFilter={setDocuments} />

        <button
          onClick={handleDeleteSelectedDocuments}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Delete Selected
        </button>

      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-auto">
        {documents.length > 0 ? (
          documents.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden cursor-pointer group"
              onClick={() => openModal(item.url)}
            >

              <input
                type="checkbox"
                className="absolute top-2 right-2 z-10"
                checked={selectedIds.has(item.id)}
                onChange={() => toggleSelectDocument(item.id)}
              />
              {item.mime_type.includes('image/') && (
                <img
                  src={item.url}
                  alt={`Uploaded Image ${index + 1}`}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                />
              )}

              {item.mime_type === 'application/pdf' && (
                <div className="relative bg-gray-100 h-40">
                  <object data={item.url} type="application/pdf" className="h-full w-full">
                    <img
                      src="https://www.science.co.il/internet/browsers/PDF-doc-256.png"
                      alt="PDF Document"
                      className="h-full w-full object-contain"
                    />
                  </object>
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 text-white font-semibold">
                    PDF Preview
                  </div>
                </div>
              )}
            </div>

          ))
        ) : (
          <p className="text-gray-500 text-xl col-span-full">No documents found</p>
        )}
      </div>



      <ImageModal
        isOpen={isModalOpen}
        imageUrl={selectedImage}
        onClose={closeModal}
        onSaveCroppedImage={handleSaveCroppedImage}
        onSaveImage={handleSaveImage}
      />
    </div>
  );
};

export default DocumentIndex;
