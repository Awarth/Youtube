function convertToFormData(data) {
  const formData = new FormData();

  // Append each field to FormData
  for (const key in data) {
    // If the field is a file (e.g., videoFile, thumbnail), ensure it's not null before appending
    if (data[key] instanceof File || data[key] instanceof Blob) {
      if (data[key] !== null) {
        formData.append(key, data[key]);
      }
    } else {
      // Append other fields (e.g., title, description, isPublished)
      formData.append(key, data[key]);
    }
  }

  return formData;
}

export { convertToFormData };
