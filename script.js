const fileInput = document.getElementById("webpInput");
const fileNameDisplay = document.getElementById("file-name");
const removeFileButton = document.getElementById("removeFile");
const uploadSuccess = document.getElementById("upload-success");
fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (file) {
    fileNameDisplay.textContent = file.name;
    uploadSuccess.style.display = "inline-block";
    removeFileButton.style.display = "inline";
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
}

document.getElementById("convertBtn").addEventListener("click", () => {
  const input = document.getElementById("webpInput");
  const file = input.files[0];
  if (!file) {
    alert("Please select a file first");
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
    };
  };

  reader.readAsDataURL(file);
});
