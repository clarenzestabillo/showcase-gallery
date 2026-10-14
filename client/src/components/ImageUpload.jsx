// 1MB in bytes
const MAX_SIZE = 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function ImageUpload({ image, onChange, onError }) {
  function handleFile(e) {
    const file = e.target.files[0];

    // user closed the file picker without choosing
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      onError("Please choose a jpg, png, or webp image.");
      return;
    }

    if (file.size > MAX_SIZE) {
      onError("Image is too large. Maximum size is 1MB.");
      return;
    }

    // turn the file into a base64 string so we can preview it and save it
    const reader = new FileReader();
    reader.onload = function () {
      onChange(reader.result);
    };
    reader.readAsDataURL(file);

    onError("");
  }

  return (
    <label className="flex h-48 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 text-sm text-slate-400 transition hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600">
      {image ? (
        <img src={image} alt="Preview" className="h-full w-full object-cover" />
      ) : (
        <span>+ Click to choose an image (max 1MB)</span>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        hidden
      />
    </label>
  );
}

export default ImageUpload;
