// src/hooks/useImagePreloader.ts
import { useEffect, useRef } from "react";

export const useImagePreloader = (urls: string[]) => {
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    imagesRef.current = urls.map((url) => {
      const img = new Image();
      img.src = url;
      return img;
    });

    return () => {
      imagesRef.current.forEach((img) => {
        img.src = "";
      });
      imagesRef.current = [];
    };
  }, [urls]);
};
