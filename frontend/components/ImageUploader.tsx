"use client";
import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  label?: string;
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label = "Upload Foto",
  images,
  onChange,
  maxImages = 10,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>(images);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).slice(0, maxImages - images.length);
    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

    const updatedPreviews = [...previewUrls, ...newPreviewUrls];
    setPreviewUrls(updatedPreviews);

    // For now, we store the preview URLs. In production, you'd upload to cloud storage
    // and store the resulting URLs.
    onChange(updatedPreviews);
  };

  const removeImage = (index: number) => {
    const updated = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(updated);
    onChange(updated);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="grid grid-cols-3 gap-3 mb-3">
        {previewUrls.map((url, idx) => (
          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
            <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              aria-label="Remove image"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {previewUrls.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 hover:border-[#84CC16] hover:bg-[#84CC16]/5 transition-colors"
          >
            <Upload className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-500 text-center px-2">
              {label}
            </span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      <p className="text-xs text-gray-500">
        Maksimum {maxImages} foto. Format: JPG, PNG
      </p>
    </div>
  );
};

export default ImageUploader;
