import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import type { Metadata } from "next";
import { Red_Hat_Display, Figtree, Cascadia_Code } from "next/font/google";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin-ext"]
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin-ext"]
});

const cascadiaCode = Cascadia_Code({
  variable: "--font-cascadia-code",
  subsets: ["latin-ext"]
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
    <html lang="pl">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      
      <body className={`${redHatDisplay.variable} ${figtree.variable} ${cascadiaCode.variable}`}>
        <Theme appearance="light" accentColor="indigo" grayColor="sage" radius="full" className="Container">
          {children}
        </Theme>
      </body>
    </html>
  );
}
