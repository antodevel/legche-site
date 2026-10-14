import Image from 'next/image';

const models = [
  { name: 'Otto Bock Avantgarde 4', brand: 'Otto Bock', image: 'avantgarde-4.png' },
  { name: 'Progeo Yoga', brand: 'Progeo', image: 'progeo-yoga.png' },
  { name: 'Ortonica S 4000 Special Edition', brand: 'Ortonica', image: 'ortonica-s4000.png' },
  { name: 'Kuschall K-series 2.0', brand: 'Kuschall', image: 'kuschall-k-series.png' },
  { name: 'Progeo Joker Carbon', brand: 'Progeo', image: 'progeo-joker-carbon.png' },
  { name: 'Panthera X (Carbon)', brand: 'Panthera', image: 'panthera-x.png' },
];

export function ModelExamples() {
  return <div className="model-examples">
    <ul className="models-grid" aria-label="Примеры активных колясок">
      {models.map(model => <li className="model-card" key={model.image}>
        <div className="model-image">
          <Image src={'/models/' + model.image} alt={'Активная коляска ' + model.name} width={330} height={330} sizes="(max-width: 600px) 280px, (max-width: 900px) 40vw, 330px" />
        </div>
        <div className="model-card-copy">
          <h3>{model.name}</h3>
        </div>
      </li>)}
    </ul>
  </div>;
}
