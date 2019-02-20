export function capitalize (s) {
  return s.replace(/(?<=^|[^a-z-])[a-z]/g, m => m.toUpperCase());
}
