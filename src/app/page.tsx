import { Header } from '@/components/header';
import { Arrow } from '@/components/icons';
import { LeadForm } from '@/components/lead-form';
import { ModelExamples } from '@/components/model-examples';
import { HeroBanners } from '@/components/hero-banners';

// Формулировки PDF с согласованными исправлениями опечаток, регистра и пунктуации.
const steps = [
  ['Анализ ИПРА и сертификата', <>Выявляем разрывы между тем, что прописано в документах, и тем, что действительно нужно <strong>для качества жизни.</strong> В ИПРА могут быть прописаны рекомендации, которые идут вразрез с желаниями пациента. И таких примеров множество.</>],
  ['Оценка условий эксплуатации', <>Анализируем антропометрию и <strong>среду использования:</strong> ширина проёмов, климатические условия, особенности доступной среды.</>],
  ['Подбор конфигурации', <>Подберём модель, которая будет комфортна в использовании, будет иметь <strong>все необходимые вам опции</strong> — ничего лишнего.</>],
  ['Профессиональное обоснование', <>Расскажем подробно про любую опцию, её функцию и <strong>практическую значимость,</strong> но простым языком. Знаем нюансы всех моделей на рынке.</>],
] as const;
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
        <h1 id="hero-title"><strong>Подберём активную коляску</strong> <span>под бюджет, диагноз, доступную среду.</span></h1>
        <div className="pdf-hero-details">
          <p>Не хватает средств — <strong>исправим ИПРА, привлечём фонды.</strong><br />Все бренды, что есть на рынке (РФ, Европа).</p>
          <p>Принимаем <strong>сертификаты СФР.</strong> Доставляем по всей РФ.</p>
        </div>
        <a className="button" href="#contact">Начать бесплатный подбор <Arrow /></a>
        </div>
        <HeroBanners />
      </section></div>
      <section className="section container pdf-process" id="process" aria-labelledby="process-title">
        <div className="pdf-section-heading"><h2 id="process-title">Подбор в экосистеме «Легче»</h2><p className="section-lead">Мы находим баланс между требованиями ИПРА, бюджетом и <strong>реальной потребностью клиента.</strong></p></div>
        <div className="steps-grid">{steps.map(([title, text], i) => <article className="step" key={title}><h3>{i + 1}. {title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className="approach-section" id="approach" aria-labelledby="approach-title"><div className="container pdf-service">
        <h2 id="approach-title">Закрываем потребность, а не просто «продаём товар», как в обычных интернет-магазинах.</h2>
        <div className="pdf-service-copy"><p>Если вам не хватает средств на активную коляску, мы <strong>бесплатно помогаем</strong> исправить ИПРА и привлечь благотворительные фонды.</p><p>В нашей команде работают опытные <strong>эрготерапевты и юристы.</strong></p><p>Мы — прежде всего сервис. Вы получаете активные коляски по рыночным ценам, так как наши ТСР <strong>напрямую от производителя,</strong> без посредников.</p></div>
      </div></section>
      <section className="section container" id="details" aria-labelledby="details-title">
        <div className="pdf-section-heading"><h2 id="details-title">Проблемы при подборе активной коляски в обычном интернет-магазине</h2></div>
        <div className="risks-list">{risks.map(([title, text]) => <article className="risk pdf-risk" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className="models-section" id="models" aria-labelledby="models-title"><div className="container"><div className="pdf-section-heading"><h2 id="models-title">70 моделей российских и европейских брендов.</h2></div><ModelExamples /></div></section>
      <section className="section contact-section contact-form-only container" id="contact" aria-labelledby="contact-title"><div className="form-panel"><h2 id="contact-title">Форма заявки</h2><LeadForm /></div></section>
    </main>
    <footer className="site-footer"><div className="container pdf-footer"><a href="/privacy">Политика конфиденциальности</a></div></footer>
  </>;
}

