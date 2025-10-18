import { create } from 'zustand';

interface UploadStore {
  uploadedImagePaths: string[];
  addImagePath: (path: string) => void;
  clearImagePaths: () => void;
  setImagePaths: (paths: string[]) => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  uploadedImagePaths: [],
  addImagePath: (path: string) =>
    set((state) => ({
      uploadedImagePaths: [...state.uploadedImagePaths, path]
    })),
  clearImagePaths: () =>
    set({ uploadedImagePaths: [] }),
  setImagePaths: (paths: string[]) =>
    set({ uploadedImagePaths: paths }),
}));
