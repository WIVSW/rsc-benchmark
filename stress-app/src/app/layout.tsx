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
      <body>
        <main className='container'>
          {children}
        </main>
      </body>
    </html>
  );
}
