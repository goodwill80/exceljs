import { exportToExcel } from './exportModule';

const ExportButton = ({ data }) => {
  const handleExport = () => {
    exportToExcel(data, 'ExportedData');
  };

  return <button onClick={handleExport}>Export to Excel</button>;
};

export default ExportButton;
