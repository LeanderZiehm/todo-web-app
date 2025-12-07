const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
console.log(API_URL);

export async function fetchTexts() {
  const response = await fetch(`${API_URL}/getTexts/`);
  if (!response.ok) throw new Error("fetch texts failed");
  return response.json();
}

export async function insertText(text:string) {
  const response = await fetch(`${API_URL}/insertText/${text}`);
  if (!response.ok) throw new Error("fetch texts failed");
  return response.json();
}
