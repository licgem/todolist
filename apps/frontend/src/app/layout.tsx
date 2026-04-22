import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'To do list',
  description: '나만의 할 일 관리 앱',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
