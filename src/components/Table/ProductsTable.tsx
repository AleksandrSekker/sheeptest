import { motion } from 'framer-motion';
import TableHead from './TableHead';
import TableCell from './TableCell';
import { useRef, useState } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';

interface ProductTableProps {
  products: Array<{
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    [key: string]: string | number | string[];
  }>;
}
const ProductTable = ({ products }: ProductTableProps) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = (newProgress: number) => {
    if (tableRef.current) {
      const maxScroll =
        tableRef.current.scrollWidth - tableRef.current.clientWidth;
      tableRef.current.scrollLeft = (newProgress / 100) * maxScroll;
      setProgress(newProgress);
    }
  };

  return (
    <div>
      <div className="mt-4 mb-4">
        <ProgressBar progress={progress} onProgressBarChange={handleScroll} />
      </div>

      <div className="overflow-scroll rounded-lg mt-2 mb-2" ref={tableRef}>
        <table className="divide-y divide-gray-200 max-w-screen-xl table-auto border-collapse">
          <thead className="bg-gray-50">
            <tr>
              {products.length
                ? Object.keys(products[0]).map((key) => (
                    <TableHead
                      key={key}
                      title={key}
                      className="border border-gray-300 min-w-0"
                    />
                  ))
                : null}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {products.length
                  ? Object.keys(product).map((key) => (
                      <TableCell
                        key={key}
                        id={product.id}
                        title={product[key]}
                        className="border-l border-b border-gray-300"
                      />
                    ))
                  : null}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
