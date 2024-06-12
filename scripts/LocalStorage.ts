export function addToSaved(item: string) {
  // use a set to make sure we dont save duplicates
  const saved = new Set(JSON.parse(localStorage.getItem("saved") || "[]"));

  // TODO: find out how to use `data.id`
  // just save the titles for now because its easier
  if (!saved.has(item)) saved.add(item);

  localStorage.setItem("saved", JSON.stringify(Array.from(saved)));
}

export function setSaved(data: [string]) {
  localStorage.setItem("saved", JSON.stringify(data));
}

export function removeFromSaved(item: string) {
  const saved = getSaved();
  const index = saved.indexOf(item);

  if (index >= -1) {
    saved.splice(index, 1);
    setSaved(saved);
  }
}

export function getSaved() {
  return typeof window !== "undefined"
    ? (JSON.parse(localStorage.getItem("saved") || "[]") as [string])
    : [];
}
