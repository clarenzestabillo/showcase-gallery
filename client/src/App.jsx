import { useState } from "react";
import Navbar from "./components/Navbar";
import GalleryPage from "./pages/GalleryPage";
import ManagePage from "./pages/ManagePage";

function App() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("gallery");
  const [editingProduct, setEditingProduct] = useState(null);

  function saveProduct(data) {
    if (editingProduct) {
      // update the product that is being edited
      setProducts((prev) =>
        prev.map((p) => (p._id === editingProduct._id ? { ...p, ...data } : p))
      );
      setEditingProduct(null);
    } else {
      // add a new one at the top, with a random id
      const newProduct = { _id: crypto.randomUUID(), ...data };
      setProducts((prev) => [newProduct, ...prev]);
    }
  }

  function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;

    setProducts((prev) => prev.filter((p) => p._id !== id));

    if (editingProduct && editingProduct._id === id) {
      setEditingProduct(null);
    }
  }

  function startEdit(product) {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar view={view} onChangeView={setView} />

      {view === "gallery" ? (
        <GalleryPage products={products} />
      ) : (
        <ManagePage
          products={products}
          editingProduct={editingProduct}
          onSave={saveProduct}
          onCancel={() => setEditingProduct(null)}
          onEdit={startEdit}
          onDelete={deleteProduct}
        />
      )}

      <footer className="py-10 text-center text-sm text-slate-400">
        Made by [Clarenz Estabillo] · [INF238]
      </footer>
    </div>
  );
}

export default App;