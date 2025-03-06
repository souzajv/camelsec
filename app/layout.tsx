import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from 'next/font/google';
import BlobCursor from "./components/blobcursor";

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains'
});

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
    <html lang="pt-br">
      <body className={jetBrainsMono.variable}>
        <div className="h-full w-full">
          {children}
        </div>
        
      </body>
    </html >
  );
}

