import { useState } from 'react';

interface CompressedFile extends File {
  compressed: boolean;
}

interface UseImageCompression {
  compressImage: (file: File) => Promise<CompressedFile>;
}

const useImageCompression = (): UseImageCompression => {
  const compressImage = async (file: File): Promise<CompressedFile> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;

          ctx?.drawImage(img, 0, 0, img.width, img.height);
          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob as Blob], file.name, {
                type: blob?.type,
              }) as CompressedFile;
              compressedFile.compressed = true;
              resolve(compressedFile);
            },
            file.type,
            0.7 
          );
        };
      };
    });
  };

  return { compressImage };
};

export default useImageCompression;
