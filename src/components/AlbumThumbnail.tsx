// src/components/AlbumThumbnail.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Album } from "../types";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Camera, Image } from "lucide-react";

interface AlbumThumbnailProps {
  album: Album;
}

const AlbumThumbnail: React.FC<AlbumThumbnailProps> = ({ album }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getCoverPhoto = () => {
    const coverPhoto = album.photos.find((photo) =>
      photo.filename.toLowerCase().includes("cover")
    );
    return coverPhoto || album.photos[0];
  };

  const coverPhoto = getCoverPhoto();

  return (
    <Link
      to={`/album/${album.name}`}
      ref={ref}
      className="group block relative aspect-square rounded-xl overflow-hidden"
    >
      <motion.div
        className="w-full h-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {inView && coverPhoto ? (
          <>
            <img
              src={coverPhoto.url}
              alt={`${album.name} cover`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity group-hover:opacity-90">
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <h2 className="text-white text-2xl font-bold capitalize mb-2">
                  {album.name}
                </h2>
                <div className="flex items-center text-gray-300 space-x-2">
                  <Camera size={16} />
                  <span className="text-sm">{album.photos.length} photos</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <Image className="w-12 h-12 text-gray-600" />
          </div>
        )}
      </motion.div>
    </Link>
  );
};

export default AlbumThumbnail;
