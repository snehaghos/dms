import React from 'react';

const ImageModal = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative p-6">
        <button
          className="absolute top-2 right-2 text-white text-2xl focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={imageUrl} alt="Enlarged Document" className="max-w-full max-h-screen object-contain" />
      </div>
    </div>
  );
};

export default ImageModal;
