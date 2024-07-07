import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShareURL.org",
  description: "URL shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-2 my-2">
        <h1 className="text-center font-bold">ShareURL.org</h1>
        {children}
        <article className="m-auto mt-2 max-w-screen-sm">
          <h2 className="text-xl">Did you know?</h2>
          <p>
            If you share short URLs instead of long ones, you will send fewer
            bytes over the Internet, which means wires & Wi-Fi routers across
            the globe will heat less and therefore save the planet from
            overheating and performance slowdown.
          </p>
        </article>
      </body>
    </html>
  );
}
