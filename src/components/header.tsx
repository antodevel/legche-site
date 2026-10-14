export function Brand() {
  return <a className="brand" href="/#top" aria-label="Легче — Экосистема мобильности — на главную"><img src="/logo.svg" alt="" width="48" height="40" /><span className="brand-name">легче</span><span className="brand-caption">Экосистема мобильности</span></a>;
}
export function Header() {
  return <header className="site-header"><div className="container header-inner"><Brand /><a className="button button-small write-us" href="#contact"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-8 8H5l-3 2v-10a9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M7 10h8M7 14h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>Написать нам</a></div></header>;
}
