import { Button } from 'antd';
import { CSVLink } from 'react-csv';
import { TbTableExport } from 'react-icons/tb';
const ExportExcel = ({ data, headers, style }) => {
  return (
    <CSVLink data={data} headers={headers} filename="data-vnfite.csv" style={{ ...style }}>
      <Button type="primary" icon={<TbTableExport />}>
        Xuất dữ liệu
      </Button>
    </CSVLink>
  );
};

export default ExportExcel;
