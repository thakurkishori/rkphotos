// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { usePhotos } from "./hooks/usePhotos";
import { AlbumView } from "./components/AlbumView";
import AlbumThumbnail from "./components/AlbumThumbnail";
import { AnimatePresence, motion } from "framer-motion";
import { InfoIcon, MenuIcon } from "lucide-react";
import InfoModal from "./components/InfoModal";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [infoModelOpen, setInfoModalOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Animated fog background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/fog.png')] opacity-20 animate-fog"></div>
        <div className="absolute inset-0 bg-[url('/fog.png')] opacity-20 animate-fog-reverse"></div>
      </div>

      {/* Header */}
      <header className="top-0 left-0 right-0 z-40 backdrop-blur-md bg-black/30">
  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    <motion.h1
      className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Nikunja Gallery
    </motion.h1>
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setInfoModalOpen(true)} // Toggle modal visibility
        className="p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <InfoIcon /> <span className="sr-only">Info</span>
      </button>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <MenuIcon size={24} />
      </button>
    </div>
  </div>
</header>

<InfoModal
        isOpen={infoModelOpen}
        onClose={() => setInfoModalOpen(false)}
      />
      {/* Main content */}
      <main className="pt-20 relative z-10">{children}</main>
    </div>
  );
};

const PageTransition: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const { albums, loading, error } = usePhotos();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-white text-xl"
        >
          Loading your memories...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <MainLayout>
        <PageTransition>
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  className="container mx-auto px-4 py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {albums.map((album, index) => (
                      <motion.div
                        key={album.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <AlbumThumbnail album={album} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              }
            />
            <Route
              path="/album/:albumName"
              element={<AlbumView albums={albums} />}
            />
          </Routes>
        </PageTransition>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
