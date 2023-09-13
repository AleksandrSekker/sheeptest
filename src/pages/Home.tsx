import { AppDispatch, RootState } from '../store/Store';
import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  setLimitValue,
  setSearchValue,
  setSkipValue,
} from '../store/productSlice';
import ProductTable from '../components/Table/ProductsTable';
import MainTitle from '../components/MainTitle/MainTitle';
import SearchInput from '../components/Input/SearchInput';
import ProductForm from '../components/Form/ProductForm';
import { ProductSchema } from '../Schema/Schema';
import Pagination from '../components/Pagination/Pagination';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, searchValue, totalPages, currentPage } =
    useSelector((state: RootState) => state.products);
  const {
    product,
    loading: formLoading,
    error: formError,
  } = useSelector((state: RootState) => state.productForm);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, searchValue, data.skip, data.limit]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="mt-5">
      <MainTitle title="Products" />
      <SearchInput
        title={`Search by title or category`}
        placeholder={`Type search value`}
        type="text"
        className="mt-2"
        name="search"
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch(setSearchValue(e.target.value))
        }
      />
      <SearchInput
        title={`Limit`}
        placeholder={`Change limit`}
        type="number"
        className="mt-2"
        name="limit"
        value={data.limit}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch(setLimitValue(e.target.value))
        }
      />
      <SearchInput
        title={`Skip amount`}
        placeholder={`Change skip amount`}
        type="number"
        className="mt-2"
        name="skip"
        value={data.skip}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch(setSkipValue(e.target.value))
        }
      />

      <div className="h-auto w-full rounded-xl border border-gray-200 shadow-md shadow-gray-400 dark:bg-white lg:p-4 mt-4">
        {formLoading ? (
          <p>Loading...</p>
        ) : (
          <ProductForm initialValues={product} schema={ProductSchema} />
        )}
        {formError ? formError : null}
      </div>
      <ProductTable products={data.products} />
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export default Home;
