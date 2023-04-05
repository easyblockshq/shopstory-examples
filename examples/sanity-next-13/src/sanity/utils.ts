function previewFilter(preview: boolean | undefined) {
  return preview ? "" : '&& !(_id in path("drafts.**"))';
}

export { previewFilter };
