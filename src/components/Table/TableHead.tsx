type TableHeadProps = {
  title: string;
  className?: string;
  onMouseDown?: () => void;
};
const TableHead = ({ title, className, onMouseDown }: TableHeadProps) => {
  return (
    <th
      onMouseDown={onMouseDown}
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    >
      {title}
    </th>
  );
};

export default TableHead;
