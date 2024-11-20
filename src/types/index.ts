// src/types/index.ts
export interface Photo {
  url: string;
  album: string;
  filename: string;
}

export interface Album {
  name: string;
  photos: Photo[];
}
