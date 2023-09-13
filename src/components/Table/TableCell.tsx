import { Link } from 'react-router-dom';

type TableCellProps = {
  title: string | number | string[];
  id: number;
  className?: string;
};
const TableCell = ({ title, className, id }: TableCellProps) => {
  return (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`}>
      <Link to={`/product/${id}`}>{title}</Link>
    </td>
  );
};

export default TableCell;
