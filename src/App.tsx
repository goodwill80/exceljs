import './App.css';
import ExportButton from './exportBtn';

function App() {
  const data = [
    {
      ata: '10:00',
      tot: '11:00',
      items: [
        { color: 'Red', brand: 'Nike' },
        { color: 'Blue', brand: 'Adidas' },
      ],
    },
    {
      ata: '12:00',
      tot: '13:00',
      items: [
        { color: 'Green', brand: 'Puma' },
        { color: 'Yellow', brand: 'Reebok' },
      ],
    },
  ];
  return (
    <div>
      <h1>React</h1>
      <ExportButton data={data} />
    </div>
  );
}

export default App;
