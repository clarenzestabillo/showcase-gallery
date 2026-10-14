import { useEffect } from "react";

function ProductModal({ product, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-4"
    >
      {/* stopPropagation so clicking inside the box does not close it */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 h-8 w-8 rounded-full bg-white/90 font-bold text-slate-700 shadow hover:bg-white"
        >
          ✕
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="aspect-4/3 w-full object-cover"
        />

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl font-bold text-slate-900">{product.name}</h3>
            <span className="rounded-full bg-indigo-50 px-3 py-1 font-bold text-indigo-600">
              ₱{Number(product.price).toLocaleString()}
            </span>
          </div>
          <p className="mt-1 text-sm text-indigo-500">{product.category || "General"}</p>
          <p className="mt-3 text-slate-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;