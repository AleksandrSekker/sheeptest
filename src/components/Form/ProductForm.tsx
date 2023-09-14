import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../Input/Input';
import { createProduct } from '../../store/productFormSlice';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from '../Button/Buttons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { AppDispatch } from '../../store/Store';

type initialValues = {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: (string | undefined)[];
};
interface IProductForm {
  initialValues: initialValues;
  schema: Yup.ObjectSchema<initialValues, Yup.AnyObject, object, ''>;
}
const ProductForm = ({ schema, initialValues }: IProductForm) => {
  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProduct(values));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-2 mt-4">
      <Input
        title={'Title'}
        placeholder={'Type title'}
        type={'text'}
        name="title"
        errors={formik.errors.title}
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      <Input
        title={'Description'}
        placeholder="Type description"
        type="text"
        name="description"
        errors={formik.errors.description}
        value={formik.values.description}
        onChange={formik.handleChange}
      />

      <Input
        title={'Price'}
        placeholder="Type price"
        type="number"
        name="price"
        errors={formik.errors.price}
        value={formik.values.price}
        onChange={formik.handleChange}
      />
      <Input
        title="Discount Percentage"
        placeholder="Enter Discount Percentage"
        type="number"
        name="discountPercentage"
        errors={formik.errors.discountPercentage}
        value={formik.values.discountPercentage}
        onChange={formik.handleChange}
      />
      <Input
        title="Rating"
        placeholder="Enter Rating"
        type="number"
        name="rating"
        errors={formik.errors.rating}
        value={formik.values.rating}
        onChange={formik.handleChange}
      />
      <Input
        title="Stock"
        placeholder="Enter Stock"
        type="number"
        name="stock"
        errors={formik.errors.stock}
        value={formik.values.stock}
        onChange={formik.handleChange}
      />
      <Input
        title="Brand"
        placeholder="Enter Brand"
        type="text"
        name="brand"
        errors={formik.errors.brand}
        value={formik.values.brand}
        onChange={formik.handleChange}
      />
      <Input
        title="Category"
        placeholder="Enter Category"
        type="text"
        name="category"
        errors={formik.errors.category}
        value={formik.values.category}
        onChange={formik.handleChange}
      />
      <Input
        title="Thumbnail"
        placeholder="Enter Thumbnail"
        type="text"
        name="thumbnail"
        errors={formik.errors.thumbnail}
        value={formik.values.thumbnail}
        onChange={formik.handleChange}
      />
      <Input
        title="Images"
        placeholder={'Type several images url'}
        type={'text'}
        name={'images'}
        errors={formik.errors.images as string}
        value={formik.values.images.join(', ')}
        onChange={(e) => {
          const imagesArray = e.target.value.split(', ');
          formik.setFieldValue('images', imagesArray);
        }}
      />
      <PrimaryButton
        type="submit"
        icon={faPaperPlane}
        disabled={!(formik.isValid && formik.dirty)}
      >
        Submit
      </PrimaryButton>
    </form>
  );
};

export default ProductForm;
