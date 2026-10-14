import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Легче — подбор активной коляски под вашу жизнь',
  description: 'Экосистема доступной мобильности «Легче». Бесплатный подбор активной коляски под бюджет, индивидуальные потребности и доступную среду. Помощь с ИПРА и фондами. Доставка по России.',
  icons: { icon: '/icon.svg' },
  openGraph: { title: 'Легче — свобода движения начинается с подбора', description: 'Активные коляски. Индивидуальный подбор, помощь с ИПРА и финансированием.', locale: 'ru_RU', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
