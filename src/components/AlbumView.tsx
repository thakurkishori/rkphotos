// src/components/AlbumView.tsx
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Album, Photo } from "../types";
import { PhotoViewer } from "./PhotoViewer";
import { motion } from "framer-motion";
import { ArrowLeft, Camera } from "lucide-react";

const PhotoCard: React.FC<{
  photo: Photo;
  onClick: () => void;
  index: number;
}> = ({ photo, onClick, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="aspect-square rounded-xl overflow-hidden cursor-pointer relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      {inView && (
        <>
          <img
            src={photo.url}
            alt={photo.filename}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        </>
      )}
    </motion.div>
  );
};

export const AlbumView: React.FC<{ albums: Album[] }> = ({ albums }) => {
  const { albumName } = useParams<{ albumName: string }>();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );
  const navigate = useNavigate();
  const album = albums.find((a) => a.name === albumName);

  if (!album) return <div>Album not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4 mb-8"
      >
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold capitalize mb-1">{album.name}</h1>
          <div className="flex items-center text-gray-400 space-x-2">
            <Camera size={16} />
            <span>{album.photos.length} photos</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {album.photos.map((photo, index) => (
          <PhotoCard
            key={photo.url}
            photo={photo}
            index={index}
            onClick={() => setSelectedPhotoIndex(index)}
          />
        ))}
      </div>

      {selectedPhotoIndex !== null && (
        <PhotoViewer
          photos={album.photos}
          initialIndex={selectedPhotoIndex}
          onClose={() => setSelectedPhotoIndex(null)}
        />
      )}
    </div>
  );
};
