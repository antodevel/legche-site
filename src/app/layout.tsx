import type { Metadata } from 'next';
import './globals.css';
import './typography.css';

export const metadata: Metadata = {
  title: 'Легче — Экосистема мобильности',
  description: 'Подберём активную коляску под бюджет, диагноз, доступную среду. Принимаем сертификаты СФР. Доставляем по всей РФ.',
  icons: { icon: '/icon.svg' },
  openGraph: { title: 'Легче — Экосистема мобильности', description: 'Подберём активную коляску под бюджет, диагноз, доступную среду.', locale: 'ru_RU', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}

