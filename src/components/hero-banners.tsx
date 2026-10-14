'use client';

import { useEffect, useState } from 'react';

const banners = [
  {
    title: 'Нужна конкретная модель?',
    paragraphs: [
      <><strong>Найдём лучшую цену</strong> напрямую от производителя и доставим <strong>с расширенной гарантией.</strong></>,
      <>Избавляем от поиска по десяткам сайтов и риска перекупщиков и мошенников.</>,
    ],
  },
  {
    title: 'Нужна экспертная помощь в подборе?',
    paragraphs: [
      <><strong>За 1 час</strong> подберём идеальную конфигурацию под диагноз и среду, ИПР.</>,
      <>Простым языком объясним практическую значимость каждой опции. Вы будете точно знать, <strong>за что платите и почему это важно.</strong></>,
    ],
  },
];

export function HeroBanners() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updateMotion(); updateVisibility();
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || hidden) return;
    const timer = window.setTimeout(() => setActive(current => (current + 1) % banners.length), 5000);
    return () => window.clearTimeout(timer);
  }, [active, reducedMotion, hidden]);

  return <div className="hero-banners" role="region" aria-roledescription="карусель" aria-label="Помощь с покупкой и подбором коляски">
    <div className="banner-slides" aria-live={reducedMotion ? 'polite' : 'off'}>
      {banners.map((banner, index) => <div className={'hero-banner ' + (index === active ? 'is-active' : '')} key={banner.title}
        role="group" aria-roledescription="баннер" aria-label={`${index + 1} из ${banners.length}`} aria-hidden={index !== active} inert={index !== active}>
        <h2>{banner.title}</h2>
        {banner.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
      </div>)}
    </div>
    <div className="banner-controls">
      <div className="banner-pagination" role="group" aria-label="Выбрать баннер">
        {banners.map((banner, index) => <button type="button" key={banner.title} aria-label={`Баннер ${index + 1}: ${banner.title}`} aria-pressed={active === index}
          onClick={() => setActive(index)}><span /></button>)}
      </div>
    </div>
  </div>;
}
