"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "./ui/Modal";

interface ImageCarouselProps {
  images: string[];
  alt?: string;
  height?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  alt = "Property image",
  height = "h-64",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className={`${height} w-full bg-gray-200 rounded-xl flex items-center justify-center`}>
        <span className="text-sm text-gray-500">No Image</span>
      </div>
    );
  }

  const goNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className={`relative ${height} w-full rounded-xl overflow-hidden bg-gray-200 group`}>
        <img
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
          onClick={() => setIsModalOpen(true)}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="full"
        showCloseButton={true}
        className="bg-black/95 border-none shadow-none"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`${alt} - full view`}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Navigation Arrows inside the Modal */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/80 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-3 hover:bg-black/80 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ImageCarousel;