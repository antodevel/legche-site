import { Header, Brand } from '@/components/header';
import { Arrow, Check } from '@/components/icons';
import { LeadForm } from '@/components/lead-form';
import { ModelExamples } from '@/components/model-examples';

const steps = [
  ['Анализ ИПРА и сертификата', 'Сопоставляем рекомендации в документах с тем, что действительно нужно для качества жизни. Находим расхождения: требования ИПРА могут идти вразрез с желаниями человека.'],
  ['Оценка условий эксплуатации', 'Учитываем параметры тела и среду использования: ширину проёмов, климатические условия, особенности доступной среды дома и на ваших маршрутах.'],
  ['Подбор конфигурации', 'Подбираем комфортную модель со всеми необходимыми вам опциями. Учитываем индивидуальные потребности — без лишних элементов в комплектации.'],
  ['Профессиональное обоснование', 'Простым языком объясняем функцию и практическую значимость каждой опции. Знаем нюансы моделей на рынке и помогаем разобраться в различиях.'],
];
const benefits = [
  ['01', 'Помогаем с финансированием', 'Если средств на активную коляску не хватает, бесплатно помогаем скорректировать ИПРА и привлечь благотворительные фонды.'],
  ['02', 'Объединяем опыт специалистов', 'В команде работают опытные эрготерапевты и юристы. В подборе опираемся на профессиональные знания и опыт 2000 пользователей активных колясок.'],
  ['03', 'Работаем напрямую', 'Поставляем технические средства реабилитации от производителей, без посредников. Вы получаете активную коляску по рыночной цене.'],
];
const risks = [
  ['Документы и реальная жизнь', 'В ИПРА могут быть шаблонные рекомендации, которые не соответствуют вашим желаниям и повседневным сценариям. Поэтому подбор начинается с сопоставления документов и реальных потребностей.'],
  ['Нюансы базовой комплектации', 'Стандартная модель может не учитывать особенности диагноза. Например, при шейных травмах может требоваться жёсткая спинка, а при ДЦП — боковые поддержки и подголовник. Эти вопросы важно обсудить при подборе.'],
  ['Совместимость с доступной средой', 'Антиопрокидыватели могут мешать использованию гусеничных подъёмников или пандусов. А отсутствие подходящих подлокотников может затруднять безопасное пересаживание. Проверяем комплектацию с учётом среды.'],
];

export default function Home() {
  return <>
    <a href="#main" className="skip-link">Перейти к содержимому</a><Header />
    <main id="main">
      <section className="hero container" id="top" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> Экосистема доступной мобильности</p><h1 id="hero-title">Ваша жизнь.<br />Ваше движение.<br /><span>Ваша коляска.</span></h1><p className="hero-description">Подберём активную коляску под ваш бюджет, диагноз и доступную среду. Чтобы каждый день было <strong>легче.</strong></p><a className="button" href="#contact">Начать бесплатный подбор <Arrow /></a><p className="hero-note">С учётом ваших потребностей. С поддержкой на каждом этапе.</p></div>
        <div className="hero-visual" aria-label="Индивидуальный подбор из 70 моделей"><div className="visual-top"><span className="mini-label">ЛЕГЧЕ — ЗНАЧИТ ПОД ВАС</span><img src="/logo.svg" width="54" height="44" alt="" /></div><div className="model-number">70<span>моделей</span></div><p className="visual-caption">Много вариантов.<br />Одно решение — ваше.</p><div className="visual-tags"><span>Российские бренды</span><span>Европейские бренды</span></div><div className="visual-bottom"><span>Подбор с эрготерапевтами</span><Arrow diagonal /></div><div className="experience-badge"><strong>2000</strong><span>пользователей —<br />опыт, на который<br />мы опираемся</span></div></div>
      </section>
      <div className="trust-band"><div className="container trust-inner"><p><Check /> Принимаем сертификаты СФР</p><p><Check /> Помогаем с ИПРА и фондами</p><p><Check /> Доставляем по всей России</p></div></div>

      <section className="section container" id="process" aria-labelledby="process-title"><div className="section-heading"><div><p className="eyebrow">01 / Как проходит подбор</p><h2 id="process-title">Начинаем с вас,<br />а не с каталога</h2></div><p className="section-intro">Находим баланс между требованиями ИПРА, бюджетом и тем, что нужно именно вам.</p></div><div className="steps-grid">{steps.map(([title, text], i) => <article className="step" key={title}><div className="step-top"><span className="step-number">0{i + 1}</span>{i < 3 && <Arrow />}</div><h3>{title}</h3><p>{text}</p></article>)}</div><div className="section-footnote"><span>ИПРА — индивидуальная программа реабилитации или абилитации.</span><a className="text-link" href="#contact">Пройти подбор <Arrow /></a></div></section>

      <section className="approach-section" id="approach" aria-labelledby="approach-title"><div className="container approach-layout"><div className="approach-copy"><p className="eyebrow">02 / Экосистема «Легче»</p><h2 id="approach-title">За коляской —<br />человек.<br /><span>Мы это учитываем.</span></h2><p>Наше дело — помочь закрыть реальную потребность в мобильности. Поэтому вместе с моделью мы подбираем решение для вашей жизни.</p><a className="text-link" href="#contact">Обсудить мою задачу <Arrow /></a></div><div className="benefits">{benefits.map(([n, title, text]) => <article className="benefit" key={n}><span className="benefit-number">{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

      <section className="section container" id="details" aria-labelledby="details-title"><div className="section-heading"><div><p className="eyebrow">03 / Что важно учесть</p><h2 id="details-title">Подходящая модель —<br />больше, чем название</h2></div><p className="section-intro">При выборе в обычном интернет-магазине легко упустить детали. Мы рассматриваем их вместе с вами.</p></div><div className="risks-list">{risks.map(([title, text], i) => <article className="risk" key={title}><span className="risk-index">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="models-section" id="models" aria-labelledby="models-title"><div className="container"><div className="section-heading"><div><p className="eyebrow">04 / Активные коляски</p><h2 id="models-title">Есть из чего выбрать.<br /><span>Есть кому помочь.</span></h2></div><p className="section-intro">70 моделей российских и европейских брендов. Подбираем не только коляску, но и её конфигурацию.</p></div><ModelExamples /><div className="assortment"><div className="assortment-heading"><span className="catalog-label">В центре выбора</span><h3>Ваши задачи<br />и повседневные маршруты</h3><a href="#contact" className="button">Подобрать коляску <Arrow /></a></div><div className="assortment-details"><div><span>01</span><h4>Индивидуальная посадка</h4><p>Учитываем параметры тела и помогаем с замерами.</p></div><div><span>02</span><h4>Необходимые опции</h4><p>Объясняем назначение каждой детали комплектации.</p></div><div><span>03</span><h4>Ваш бюджет</h4><p>Учитываем сертификат СФР и возможности дополнительного финансирования.</p></div></div></div><p className="models-note">Конкретную модель и комплектацию предложим после знакомства с вашей задачей.</p></div></section>

      <section className="section contact-section container" id="contact" aria-labelledby="contact-title"><div className="contact-copy"><p className="eyebrow">05 / Первый шаг</p><h2 id="contact-title">Давайте сделаем<br />движение <span>легче.</span></h2><p>Оставьте заявку на бесплатный подбор. Поможем разобраться в моделях, комплектации и замерах.</p><div className="contact-points"><p><Check /> Экспертный подбор</p><p><Check /> Помощь с замерами</p><p><Check /> Внимание к вашим условиям жизни</p></div><div className="contact-aside"><img src="/logo.svg" alt="" width="48" height="40" /><p>Вам не нужно разбираться<br />во всём самостоятельно.</p></div></div><div className="form-panel"><h3>С чего начнём?</h3><p className="form-description">Оставьте контакты — обсудим вашу задачу.</p><LeadForm /></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-top"><Brand /><p>Экосистема доступной мобильности.<br />Подбираем решения для вашей жизни.</p><a className="text-link" href="#top">Наверх <span aria-hidden="true">↑</span></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} «Легче»</span><a href="/privacy">Политика конфиденциальности</a><span>Движение начинается с вас</span></div></footer>
  </>;
}

