import "./globals.css";

export const metadata = {
  title: "Nutricionista | Landing Page",
  description: "Landing page em construção",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
