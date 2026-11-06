type Publishable = { link: string; autorizado: boolean };

/** Só aparece trabalho com link e autorização do cliente. */
export function visiblePortfolio<T extends Publishable>(items: T[]): T[] {
  return items.filter((item) => item.autorizado && item.link.trim() !== "");
}
