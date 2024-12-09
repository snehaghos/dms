import React, { useState, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { removeBackground } from '@imgly/background-removal';

const ImageModal = ({ isOpen, imageUrl, onClose, onSaveCroppedImage }) => {
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [showCrop, setShowCrop] = useState(false);
  const [scale, setScale] = useState(1);
  const [backgroundRemoved, setBackgroundRemoved] = useState(false);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [processedImage, setProcessedImage] = useState(imageUrl);

  const handleZoomIn = () => setScale((prevScale) => Math.min(prevScale + 0.1, 3));
  const handleZoomOut = () => setScale((prevScale) => Math.max(prevScale - 0.1, 1));

  const removeImageBackground = async () => {
    console.log(imageRef.current);


    if (!imageRef.current) return;

    try {
      const imgElement = imageRef.current;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imgElement.src;

      img.onload = async () => {
        console.log('Image loaded, trying to remove background...');

        const result = await removeBackground(img);

        if (result) {
          console.log('Background removal successful:', result);

          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.putImageData(result, 0, 0);

          const processedImageUrl = canvas.toDataURL('image/png');
          setProcessedImage(processedImageUrl);
          setBackgroundRemoved(true);
        } else {
          console.error('Background removal failed: no result returned.');
        }
      };
    } catch (error) {
      console.error('Error during background removal:', error);
    }
  };




  const saveCroppedImage = () => {
    if (completedCrop?.width && completedCrop?.height && imageRef.current) {
      const canvas = canvasRef.current;
      const image = imageRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext('2d');

      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      canvas.toBlob((blob) => {
        if (onSaveCroppedImage) {
          onSaveCroppedImage(blob);
        }

        onClose();
      }, 'image/jpeg');
    }
  };

  const saveAsCroppedImage = () => {
    saveCroppedImage();
    alert('Save As');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-200 overflow-hidden">
      <div className="absolute top-0 w-full flex justify-between items-center p-4 bg-gray-900 bg-opacity-75 z-10">
        <div className="flex items-center space-x-4">
          <button className="text-white" onClick={() => setShowCrop(!showCrop)}>
            {showCrop ? 'Cancel Crop' : 'Crop'}
          </button>
          {showCrop && (
            <>
              <button className="text-white" onClick={saveCroppedImage}>
                Save
              </button>
              <button className="text-white" onClick={saveAsCroppedImage}>
                Save As
              </button>
            </>
          )}
          <button className="text-white" onClick={removeImageBackground}>
            Remove Background
          </button>
          <button className="text-white">Delete</button>
        </div>
        <button className="text-white text-3xl focus:outline-none" onClick={onClose}>
          &times;
        </button>
      </div>

      <div className="relative flex justify-center items-center p-4 z-0 h-full">
        {showCrop ? (
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(c) => setCompletedCrop(c)}
          >
            <img
              ref={imageRef}
              crossOrigin="anonymous"
              src={processedImage || imageUrl}
              alt="Document"
              style={{ transform: `scale(${scale})` }}
              className="rounded-lg shadow-lg h-fit"
            />

          </ReactCrop>
        ) : (
          <img
            src={processedImage || imageUrl}
            crossOrigin="anonymous"
            alt="Document"
            className="rounded-lg shadow-lg h-fit"
          />
        )}

      </div>

      <div className="absolute bottom-0 w-full flex justify-center items-center p-4 bg-gray-900 bg-opacity-75 z-10">
        <div className="text-white flex items-center space-x-4">
          <button onClick={handleZoomOut}>Zoom Out</button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={handleZoomIn}>Zoom In</button>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ImageModal;
