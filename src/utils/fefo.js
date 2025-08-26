export function pickFefo(lots) {
  const now = new Date();
  return lots
    .filter(l => l.quantity > 0 && new Date(l.expiryDate) > now)
    .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))[0] || null;
}
