import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Self-Assessment Procurement Business Partner",
  description: "Auto-évaluation achats avec scoring automatique et radar chart."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
