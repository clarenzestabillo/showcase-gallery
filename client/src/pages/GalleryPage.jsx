import { useState } from "react";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";

function GalleryPage({ products, loading }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("none");
  const [selected, setSelected] = useState(null);

  const categories = ["All", ...new Set(products.map((p) => p.category || "General"))];

  const shown = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || (p.category || "General") === category;
    return matchSearch && matchCategory;
  });

  if (sort === "low") {
    shown.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    shown.sort((a, b) => b.price - a.price);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* hero banner */}
      <section className="relative mb-10 overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 via-violet-600 to-cyan-500 p-10 text-white shadow-xl md:p-14">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10"></div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
          Product Gallery
        </p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">Discover Our Products</h2>
        <p className="mt-3 text-white/80">
          {products.length} items available · by [Your Name]
        </p>
      </section>

      {/* search and sort */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500"
        >
          <option value="none">Sort by price</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>

      {/* category filter buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={
              "rounded-full px-4 py-2 text-sm font-medium transition " +
              (category === c
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100")
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* show loading text while fetching */}
      {loading ? (
        <p className="py-20 text-center text-slate-400">Loading products...</p>
      ) : (
        <ProductGrid products={shown} onSelect={setSelected} />
      )}

      {/* details popup */}
      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}

export default GalleryPage;