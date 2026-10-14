'use client';
import { useState } from 'react';
import { Arrow } from './icons';

export function Brand() {
  return <a className="brand" href="/#top" aria-label="Легче — на главную"><img src="/logo.svg" alt="" width="48" height="40" /><span>легче<span className="brand-caption">доступная мобильность</span></span></a>;
}
const links = [['#process', 'Как мы подбираем'], ['#approach', 'Почему «Легче»'], ['#models', 'Коляски']];
export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container header-inner"><Brand /><nav className="desktop-nav" aria-label="Основная навигация">{links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav><a className="button button-small header-cta" href="#contact">Начать подбор <Arrow diagonal /></a><button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setOpen(!open)}><span>{open ? 'Закрыть' : 'Меню'}</span><span aria-hidden="true">{open ? '×' : '☰'}</span></button></div>{open && <nav id="mobile-menu" className="mobile-nav container" aria-label="Мобильная навигация">{[...links, ['#contact', 'Начать подбор']].map(([href, label]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}<Arrow /></a>)}</nav>}</header>;
}
