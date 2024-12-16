import {
  BRANCH,
  GITHUB_RAW_URL,
  REPO_NAME,
  REPO_OWNER,
} from "../config/constants";
import { Album, Photo } from "../types";

export const constructGithubUrl = (path: string) =>
  `${GITHUB_RAW_URL}/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${path}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseGithubTree = (tree: any[]): Album[] => {
  const albums = new Map<string, Photo[]>();
  const allPhotos: Photo[] = [];

  tree.forEach((item) => {
    if (!item.path.startsWith("src/photos/")) return;

    const parts = item.path.split("/");
    if (parts.length < 3) return;

    const albumName = parts.length === 3 ? "general" : parts[2];
    if (!albums.has(albumName)) {
      albums.set(albumName, []);
    }

    if (item.type === "blob" && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.path)) {
      const photo: Photo = {
        url: constructGithubUrl(item.path),
        album: albumName,
        filename: parts[parts.length - 1],
      };

      albums.get(albumName)!.push(photo);
      allPhotos.push(photo);
    }
  });

  // Sort albums individually
  const sortedAlbums = Array.from(albums.entries()).map(([name, photos]) => ({
    name,
    photos: photos.sort((a, b) => a.filename.localeCompare(b.filename)),
  }));

  // Create "All" album with all photos sorted
  const allAlbum: Album = {
    name: "All",
    photos: allPhotos.sort((a, b) => a.filename.localeCompare(b.filename)),
  };

  return [allAlbum, ...sortedAlbums];
};