const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error("VITE_API_URL is missing. Check .env or Vercel settings.");
}

// one function that all the other api calls use
async function request(path, options = {}) {
  const res = await fetch(API_URL + "/api/products" + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error("Request failed: " + res.status);
  }

  return res.json();
}

export function getProducts() {
  return request("");
}

export function createProduct(data) {
  return request("", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateProduct(id, data) {
  return request("/" + id, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteProduct(id) {
  return request("/" + id, { method: "DELETE" });
}