import { Header } from '@/components/header';
import { Arrow } from '@/components/icons';
import { LeadForm } from '@/components/lead-form';
import { ModelExamples } from '@/components/model-examples';
import Image from 'next/image';

// Формулировки PDF с согласованными исправлениями опечаток, регистра и пунктуации.
const steps = [
  ['Анализ ИПРА и сертификата', 'Выявляем разрывы между тем, что прописано в документах, и тем, что действительно нужно для качества жизни. В ИПРА могут быть прописаны рекомендации, которые идут вразрез с желаниями пациента. И таких примеров множество.'],
  ['Оценка условий эксплуатации', 'Анализируем антропометрию и среду использования: ширина проёмов, климатические условия, особенности доступной среды.'],
  ['Подбор конфигурации', 'Подберём модель, которая будет комфортна в использовании, будет иметь все необходимые вам опции — ничего лишнего.'],
  ['Профессиональное обоснование', 'Расскажем подробно про любую опцию, её функцию и практическую значимость, но простым языком. Знаем нюансы всех моделей на рынке.'],
];
const risks = [
  ['Конфликт ИПРА и реальности:', 'В документах часто прописаны шаблонные рекомендации, которые идут вразрез с вашими желаниями и реальными сценариями жизни.'],
  ['Медицинские риски базовых комплектаций:', 'Стандартные модели игнорируют критические нюансы диагнозов (например, необходимость жёсткой спинки при шейных травмах или боковых поддержек и подголовника при ДЦП).'],
  ['Конструктивные ловушки среды:', 'Базовые элементы (те же антиопрокидыватели) могут физически блокировать использование гусеничных подъёмников или пандусов, а отсутствие правильных подлокотников делает безопасное пересаживание невозможным.'],
];

export default function Home() {
  return <>
    <a href="#main" className="skip-link">Перейти к содержимому</a><Header />
    <main id="main" className="pdf-copy">
      <div className="hero-shell"><section className="container pdf-hero" id="top" aria-labelledby="hero-title">
        <div className="hero-editorial-copy">
        <h1 id="hero-title"><strong>Подберём активную коляску</strong> <span>под <em>бюджет, диагноз, доступную среду.</em></span></h1>
        <div className="pdf-hero-details">
          <p>Не хватает средств — исправим ИПРА, привлечём фонды.<br />Все бренды, что есть на рынке (РФ, Европа).</p>
          <p>Принимаем сертификаты СФР. Доставляем по всей РФ.</p>
        </div>
        <a className="button" href="#contact">Начать бесплатный подбор <Arrow /></a>
        </div>
        <figure className="hero-product">
          <div className="hero-product-art"><span className="hero-product-orbit" aria-hidden="true" /><Image src="/models/avantgarde-4.png" alt="Активная коляска Otto Bock Avantgarde 4" width={330} height={330} priority sizes="(max-width: 600px) 280px, (max-width: 1000px) 40vw, 440px" /></div>
          <figcaption><span className="product-caption-dot" aria-hidden="true" />Otto Bock Avantgarde 4</figcaption>
        </figure>
      </section></div>
      <section className="section container pdf-process" id="process" aria-labelledby="process-title">
        <div className="pdf-section-heading"><h2 id="process-title">Подбор в экосистеме «Легче»</h2><p><em>Мы находим баланс между требованиями ИПРА, бюджетом и реальной потребностью клиента.</em></p></div>
        <div className="steps-grid">{steps.map(([title, text], i) => <article className="step" key={title}><h3>{i + 1}. {title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className="approach-section" id="approach" aria-labelledby="approach-title"><div className="container pdf-service">
        <h2 id="approach-title">Закрываем потребность, а не просто «продаём товар», как в обычных интернет-магазинах.</h2>
        <div className="pdf-service-copy"><p>Если вам не хватает средств на активную коляску, мы бесплатно помогаем исправить ИПРА и привлечь благотворительные фонды.</p><p>В нашей команде работают опытные эрготерапевты и юристы.</p><p><strong>Мы — прежде всего сервис.</strong> Вы получаете активные коляски по рыночным ценам, так как наши ТСР напрямую от производителя, без посредников.</p></div>
      </div></section>
      <section className="section container" id="details" aria-labelledby="details-title">
        <div className="pdf-section-heading"><h2 id="details-title">Проблемы при подборе активной коляски в обычном интернет-магазине</h2></div>
        <div className="risks-list">{risks.map(([title, text]) => <article className="risk pdf-risk" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className="models-section" id="models" aria-labelledby="models-title"><div className="container"><div className="pdf-section-heading"><h2 id="models-title">70 моделей российских и европейских брендов.</h2></div><ModelExamples /></div></section>
      <section className="section contact-section container" id="contact" aria-labelledby="contact-title"><div className="contact-copy pdf-contact-copy"><p>Напишите сейчас:</p><ul className="contact-reasons"><li>Ответ сразу.</li><li>Экспертный подбор.</li><li>Помощь в замерах.</li></ul></div><div className="form-panel"><h2 id="contact-title">Форма заявки</h2><LeadForm /></div></section>
    </main>
    <footer className="site-footer"><div className="container pdf-footer"><a href="/privacy">Политика конфиденциальности</a></div></footer>
  </>;
}

