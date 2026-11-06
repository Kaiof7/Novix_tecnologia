import type { Empresa } from "./config-schema";

type Json = string | number | boolean | Json[] | { [key: string]: Json };

/** Remove chaves com "" ou listas vazias, para o JSON-LD não levar campo em branco. */
function compact(obj: Record<string, Json | undefined>): Record<string, Json> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0)),
  ) as Record<string, Json>;
}

/** Organization + LocalBusiness para o Google entender quem é e onde atende. */
export function buildJsonLd(e: Empresa) {
  const id = `${e.siteUrl}/#empresa`;
  const sameAs = [e.instagram].filter(Boolean);
  const address = compact({ "@type": "PostalAddress", addressLocality: e.cidade, addressRegion: e.uf, addressCountry: "BR" });
  return {
    "@context": "https://schema.org",
    "@graph": [
      compact({ "@type": "Organization", "@id": `${e.siteUrl}/#organizacao`, name: e.nome, url: e.siteUrl, logo: `${e.siteUrl}/logo.svg`, sameAs }),
      compact({
        "@type": "LocalBusiness",
        "@id": id,
        name: e.nome,
        description: e.fraseApoio,
        url: e.siteUrl,
        image: `${e.siteUrl}/og.png`,
        telephone: `+${e.whatsapp}`,
        email: e.email,
        taxID: e.cnpj,
        areaServed: e.area,
        address,
        sameAs,
      }),
    ],
  };
}
