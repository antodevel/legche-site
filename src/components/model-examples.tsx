'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Arrow } from './icons';

const models = [
  { name: 'Otto Bock Avantgarde 4', brand: 'Otto Bock', image: 'avantgarde-4.png' },
  { name: 'Progeo Yoga', brand: 'Progeo', image: 'progeo-yoga.png' },
  { name: 'Ortonica S 4000 Special Edition', brand: 'Ortonica', image: 'ortonica-s4000.png' },
  { name: 'Kuschall K-series 2.0', brand: 'Kuschall', image: 'kuschall-k-series.png' },
  { name: 'Progeo Joker Carbon', brand: 'Progeo', image: 'progeo-joker-carbon.png' },
  { name: 'Panthera X (Carbon)', brand: 'Panthera', image: 'panthera-x.png' },
];

export function ModelExamples() {
  const track = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ first: 1, last: 3, previous: false, next: false });

  function updatePosition() {
    const list = track.current;
    const card = list?.firstElementChild;
    if (!list || !card) return;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const step = card.getBoundingClientRect().width + gap;
    const visibleColumns = Math.max(1, Math.round((list.clientWidth + gap) / step));
    const firstColumn = Math.max(0, Math.min(models.length - visibleColumns, Math.round(list.scrollLeft / step)));
    setPosition({
      first: firstColumn + 1,
      last: Math.min(models.length, firstColumn + visibleColumns),
      previous: list.scrollLeft > 2,
      next: list.scrollLeft < list.scrollWidth - list.clientWidth - 2,
    });
  }

  useEffect(() => {
    updatePosition();
    const observer = new ResizeObserver(updatePosition);
    if (track.current) observer.observe(track.current);
    return () => observer.disconnect();
  }, []);

  function move(direction: number) {
    const list = track.current;
    const card = list?.firstElementChild;
    if (!list || !card) return;
    const step = card.getBoundingClientRect().width + (parseFloat(getComputedStyle(list).columnGap) || 0);
    list.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  return <div className="model-examples models-carousel" role="region" aria-roledescription="карусель" aria-label="Модели активных колясок">
    <ul ref={track} id="models-track" className="models-grid models-track" aria-label="Примеры активных колясок" tabIndex={0} onScroll={updatePosition}
      onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
      {models.map(model => <li className="model-card" key={model.image}>
        <div className="model-image">
          <Image src={'/models/' + model.image} alt={'Активная коляска ' + model.name} width={330} height={330} sizes="(max-width: 600px) 280px, (max-width: 900px) 45vw, 380px" />
        </div>
        <div className="model-card-copy">
          <h3>{model.name}</h3>
        </div>
      </li>)}
    </ul>
    <div className="models-carousel-controls">
      <p className="models-position" role="status" aria-live="polite" aria-atomic="true"><span className="sr-only">Показаны модели </span>{position.first === position.last ? position.first : `${position.first}–${position.last}`} <span className="models-position-total">из {models.length}</span></p>
      <div className="models-carousel-buttons" role="group" aria-label="Перелистывание моделей">
        <button type="button" aria-label="Предыдущие модели" aria-controls="models-track" disabled={!position.previous} onClick={() => move(-1)}><span className="model-arrow-back"><Arrow /></span></button>
        <button type="button" aria-label="Следующие модели" aria-controls="models-track" disabled={!position.next} onClick={() => move(1)}><Arrow /></button>
      </div>
    </div>
  </div>;
}
