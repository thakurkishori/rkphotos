// src/hooks/usePhotos.ts
import { useState, useEffect } from "react";
import { Album } from "../types";
import { parseGithubTree } from "../utils/github";
import { BRANCH, GITHUB_API, REPO_NAME, REPO_OWNER } from "../config/constants";

export const usePhotos = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // file in assets folder of repo
        const response = await fetch(
          `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${BRANCH}?recursive=1`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              : `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch photos");

        const data = await response.json();
        const parsedAlbums = parseGithubTree(data.tree);
        console.log({ parsedAlbums });
        setAlbums(parsedAlbums);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return { albums, loading, error };
};
Authorization