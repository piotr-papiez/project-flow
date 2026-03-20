import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import type { Metadata } from "next";
import { Figtree, Red_Hat_Display } from "next/font/google";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin-ext"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Dayglow",
  description: "Uproszczona lista zadań",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.variable} ${figtree.variable}`}>
        <Theme accentColor="indigo" grayColor="sage" radius="full" className="Container">
          {children}
        </Theme>
      </body>
    </html>
  );
}
