const createCloudinarySlice = (set) => ({
  uploadedFiles: [],
  addUploadedFile: (file) =>
    set((state) => ({ uploadedFiles: [...state.uploadedFiles, file] })),
});

export default createCloudinarySlice;
