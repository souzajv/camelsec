import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CamelSec",
  description: "Não seja um unicórnio, seja um camelo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=""
      >
        {children}
      </body>
    </html>
  );
}
