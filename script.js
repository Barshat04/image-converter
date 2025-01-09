const fileInput = document.getElementById("webpInput");
const fileNameDisplay = document.getElementById("file-name");
const removeFileButton = document.getElementById("removeFile");
const uploadSuccess = document.getElementById("upload-success");
const successMessage = document.getElementById("success-message");
fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (file) {
    fileNameDisplay.textContent = file.name;
    uploadSuccess.style.display = "flex";
    removeFileButton.style.display = "inline";
    // Hide the container after 3 seconds
    setTimeout(() => {
      uploadSuccess.style.display = "none";
    }, 2000);
  } else {
    resetFileInput();
  }
});
removeFileButton.addEventListener("click", function () {
  resetFileInput();
});
function resetFileInput() {
  // Clear the input value
  fileInput.value = "";

  // Reset the file name display
  fileNameDisplay.textContent = "No file chosen";

  // Hide the remove button
  removeFileButton.style.display = "none";
  //hide upload success message
  uploadSuccess.style.display = "none";

  downloadLink.style.display = "none";
}

document.getElementById("convertBtn").addEventListener("click", () => {
  const input = document.getElementById("webpInput");
  const file = input.files[0];
  if (!file) {
    alert("Please upload an image first");
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Convert to JPEG
      const jpegDataUrl = canvas.toDataURL("image/jpeg");
      const downloadLink = document.getElementById("downloadLink");
      downloadLink.href = jpegDataUrl;
      downloadLink.download = "converted-image.jpg";
      downloadLink.style.display = "inline-block";
      downloadLink.textContent = "Download JPEG";

      if (jpegDataUrl) {
        // Show upload success message
        successMessage.textContent = "Converted successfully!";
        uploadSuccess.style.display = "flex";
        setTimeout(() => {
          uploadSuccess.style.display = "none";
        }, 2000);
      }
    };
  };

  reader.readAsDataURL(file);
});
