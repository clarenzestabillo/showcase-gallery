import { useState } from "react";
import ImageUpload from "./ImageUpload";

const emptyForm = { name: "", price: "", description: "", category: "", image: "" };

const inputClass =
  "w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

function ProductForm({ editingProduct, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    editingProduct ? { ...emptyForm, ...editingProduct } : emptyForm
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.name.trim() === "" || form.price === "" || form.image === "") {
      setError("Name, price, and image are required.");
      return;
    }

    setSaving(true);

    try {
      await onSubmit({
        name: form.name.trim(),
        price: Number(form.price),
        description: form.description,
        category: form.category.trim() || "General",
        image: form.image,
      });

      setForm(emptyForm);
      setError("");
    } catch (err) {
      setError("Could not save the product. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  let buttonText = "Add Product";
  if (saving) {
    buttonText = "Saving...";
  } else if (editingProduct) {
    buttonText = "Update";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-24"
    >
      <h2 className="text-xl font-bold text-slate-900">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>

      <ImageUpload
        image={form.image}
        onChange={(image) => setForm((prev) => ({ ...prev, image: image }))}
        onError={setError}
      />

      <input
        name="name"
        placeholder="Product name"
        className={inputClass}
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        min="0"
        placeholder="Price (₱)"
        className={inputClass}
        value={form.price}
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category (e.g. Gadgets, Bags)"
        className={inputClass}
        value={form.category}
        onChange={handleChange}
      />
      <textarea
        name="description"
        rows="3"
        placeholder="Short description"
        className={inputClass}
        value={form.description}
        onChange={handleChange}
      />

      {error && (
        <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
        >
          {buttonText}
        </button>

        {/* cancel only shows when editing */}
        {editingProduct && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl bg-slate-100 py-3 font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;                                                     