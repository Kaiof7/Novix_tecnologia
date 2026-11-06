import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Footer, Header, WhatsAppBar } from "@/components/layout-parts";
import { empresa } from "@/lib/config";
import "./globals.css";

const display = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["600", "700"] });
const sans = Inter({ variable: "--font-inter", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  metadataBase: new URL(empresa.siteUrl),
  title: { default: empresa.seoTitulo, template: `%s · ${empresa.nome}` },
  description: empresa.seoDescricao,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    locale: "pt_BR",
    siteName: empresa.nome,
    title: empresa.seoTitulo,
    description: empresa.seoDescricao,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${empresa.nome}: ${empresa.frase}` }],
  },
};

export const viewport: Viewport = { themeColor: "#111318" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="sr-only z-50 rounded-full bg-blue px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppBar />
      </body>
    </html>
  );
}
