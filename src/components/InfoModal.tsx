import React from "react";
import { motion } from "framer-motion";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <motion.div
        className="bg-gray-50 text-gray-900 p-8 rounded-lg shadow-2xl max-w-lg w-full relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-900 hover:text-gray-500"
          onClick={onClose}
        >
          ✖️
        </button>
        <h2 className="text-3xl font-bold text-purple-700 mb-4 flex items-center">
          ✨ Nikunja Gallery ✨
        </h2>
        <p className="mb-4 text-lg leading-relaxed">
          Welcome to <strong>Nikunja Gallery</strong>, a personal, digital
          shrine where the eternal love of <strong>Radha-Krishna</strong> is
          celebrated in breathtakingly modern and imaginative ways.
        </p>
        <p className="mb-4 text-lg leading-relaxed">
          This gallery is my <em>ode</em> to their divine lila—the playful, yet
          profound dance of love between the soul and the infinite. By fusing
          spirituality with technology, I invite you to journey into a realm
          where the sacred meets the futuristic. 🌌✨
        </p>
        <p className="mb-4 text-lg">
          <strong>"Nikunj"</strong> refers to a sacred grove—a personal haven
          for Radha and Krishna's intimate moments. This project is my way of
          creating a digital nikunj for everyone seeking a connection with the
          divine in the modern world. 🕊️
        </p>
        <p className="italic text-purple-600">
          "Through the lens of AI, I imagine myself as a gopi, yearning for the
          closest glimpse of their eternal love. This gallery is my humble
          offering, a prayer whispered into the boundless void of the digital
          age." 🌸
        </p>
        <p className="text-sm text-gray-500 mt-6">
          *Some content may include artistic nudity or mature themes. Viewer
          discretion is advised.*
        </p>
      </motion.div>
    </div>
  );
};

export default InfoModal;
