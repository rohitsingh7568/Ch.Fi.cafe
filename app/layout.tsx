// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css"; // Tailwind CSS imports

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: '☕ Ch.Fi - Chai, Coffee & Stories | च.फी - चाय, कॉफी और किस्से',
  description: 'The best spot for chai, coffee, and light bites in Jaipur.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply custom font variable and global styles */}
      <body className={`${poppins.variable} font-sans bg-chfi-white text-gray-800`}>
        {children}
      </body>
    </html>
  );
}