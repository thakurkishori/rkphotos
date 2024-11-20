import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
} from "lucide-react";
import { Photo } from "../types";
import { useImagePreloader } from "../hooks/useImagePreloader";

interface PhotoViewerProps {
  photos: Photo[];
  initialIndex: number;
  onClose: () => void;
}

export const PhotoViewer: React.FC<PhotoViewerProps> = ({
  photos,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload adjacent images
  const preloadUrls = useCallback(() => {
    const urls: string[] = [];
    [-2, -1, 0, 1, 2].forEach((offset) => {
      const idx = currentIndex + offset;
      if (idx >= 0 && idx < photos.length) {
        urls.push(photos[idx].url);
      }
    });
    return urls;
  }, [currentIndex, photos]);

  useImagePreloader(preloadUrls());

  const navigate = useCallback(
    (newDirection: number) => {
      if (scale !== 1) {
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
      const newIndex = currentIndex + newDirection;
      if (newIndex >= 0 && newIndex < photos.length) {
        setDirection(newDirection);
        setCurrentIndex(newIndex);
      }
    },
    [currentIndex, photos.length, scale]
  );

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleZoom = useCallback((delta: number) => {
    setScale((prevScale) => {
      const newScale = prevScale + delta;
      return Math.min(Math.max(1, newScale), 4);
    });
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.2 : 0.2;
        handleZoom(delta);
      }
    },
    [handleZoom]
  );

  const handleImageDrag = (e: any, info: PanInfo) => {
    console.log(e);
    if (scale > 1) {
      setPosition((prev) => ({
        x: prev.x + info.delta.x,
        y: prev.y + info.delta.y,
      }));
    }
  };

  const handleDragEnd = (e: any, info: PanInfo) => {
    console.log(e);
    setIsDragging(false);
    if (scale === 1) {
      const threshold = 50;
      const swipe = info.offset.x;

      if (Math.abs(swipe) > threshold) {
        if (swipe > 0 && currentIndex > 0) {
          navigate(-1);
        } else if (swipe < 0 && currentIndex < photos.length - 1) {
          navigate(1);
        }
      }
    }
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "Escape") {
        if (scale !== 1) {
          setScale(1);
          setPosition({ x: 0, y: 0 });
        } else {
          onClose();
        }
      }
      if (e.key === "f") toggleFullscreen();
      if (e.key === "+" && e.ctrlKey) {
        e.preventDefault();
        handleZoom(0.2);
      }
      if (e.key === "-" && e.ctrlKey) {
        e.preventDefault();
        handleZoom(-0.2);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [navigate, onClose, toggleFullscreen, handleZoom, scale]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[9999] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDragging) {
          if (scale !== 1) {
            setScale(1);
            setPosition({ x: 0, y: 0 });
          } else {
            onClose();
          }
        }
      }}
      onWheel={handleWheel}
    >
      <div className="absolute top-4 right-4 flex gap-2 z-50 bg-black/30 p-2 rounded-lg backdrop-blur-sm">
        {" "}
        <button
          onClick={() => handleZoom(-0.2)}
          className="p-2 text-white hover:text-gray-300 disabled:opacity-50"
          disabled={scale === 1}
        >
          <ZoomOut size={24} />
        </button>
        <button
          onClick={() => handleZoom(0.2)}
          className="p-2 text-white hover:text-gray-300 disabled:opacity-50"
          disabled={scale === 4}
        >
          <ZoomIn size={24} />
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-black/50 rounded-full text-white hover:text-white hover:bg-black/70 transition-all"
        >
          {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
        </button>
        <button
          onClick={onClose}
          className="p-2 text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 p-4 text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed z-50"
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={() => navigate(1)}
        className="absolute right-4 p-4 text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed z-50"
        disabled={currentIndex === photos.length - 1}
      >
        <ChevronRight size={32} />
      </button>

      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ x: 100 * direction, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100 * direction, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag={scale === 1 ? "x" : true}
            dragConstraints={
              scale === 1
                ? undefined
                : {
                    left: -1000,
                    right: 1000,
                    top: -1000,
                    bottom: 1000,
                  }
            }
            dragElastic={scale === 1 ? 0.2 : 0}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            onDrag={handleImageDrag}
            style={{
              scale,
              x: position.x,
              y: position.y,
              cursor: scale > 1 ? "grab" : "default",
            }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <img
              src={photos[currentIndex].url}
              alt={photos[currentIndex].filename || ""}
              className="max-w-full max-h-full object-contain select-none"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white">
        {currentIndex + 1} / {photos.length}
      </div>
    </motion.div>
  );
};

export default PhotoViewer;
