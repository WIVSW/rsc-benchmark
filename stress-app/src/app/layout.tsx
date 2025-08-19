import '../global.scss'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Бенчмарк серверных компонентов React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"></link>
      </head>
      <body>
        <main className='container'>
          {children}
        </main>
      </body>
    </html>
  );
}
