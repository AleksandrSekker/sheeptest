import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import {
  deleteOneProduct,
  fetchOneProduct,
  fetchProducts,
} from '../store/productSlice';
import { DangerButton, SecondaryButton } from '../components/Button/Buttons';
import { useNavigate } from 'react-router-dom';

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    loading,
    error,
    singleProduct: product,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchOneProduct(Number(id)));
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  console.log(product);
  console.log(id);
  console.log(loading);
  console.log(error);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div>
            <p className="text-gray-600">Brand: {product.brand}</p>
            <p className="text-gray-600">Category: {product.category}</p>
            <p className="text-gray-600">Description: {product.description}</p>
            <p className="text-gray-600">Price: ${product.price}</p>
            <p className="text-gray-600">
              Discount Percentage: {product.discountPercentage}%
            </p>
            <p className="text-gray-600">Rating: {product.rating}</p>
            <p className="text-gray-600">Stock: {product.stock}</p>
            <div className="flex justify-around mt-4">
              <SecondaryButton
                onClick={() => dispatch(deleteOneProduct(Number(id)))}
              >
                Update
              </SecondaryButton>
              <DangerButton
                onClick={() => {
                  dispatch(deleteOneProduct(Number(id))).then(() => {
                    navigate('/');
                    dispatch(fetchProducts());
                  });
                }}
              >
                Delete
              </DangerButton>
            </div>
          </div>
        </div>
        <h2 className="text-xl mt-4">Images:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {product.images
            ? product.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Image ${index}`}
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
