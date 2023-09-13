import * as Yup from 'yup';

const ProductSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price must be greater than or equal to 0'),
  discountPercentage: Yup.number()
    .min(0, 'Discount percentage must be greater than or equal to 0')
    .required(),
  rating: Yup.number()
    .min(0, 'Rating must be greater than or equal to 0')
    .required(),
  stock: Yup.number()
    .required('Stock is required')
    .min(0, 'Stock must be greater than or equal to 0'),
  brand: Yup.string().required('Brand is required'),
  category: Yup.string().required('Category is required'),
  thumbnail: Yup.string()
    .url('Invalid URL') // This checks if the string is a valid URL
    .required('Image url is required'),
  images: Yup.array()
    .of(Yup.string())
    .default([''])
    .required('Images are required'),
});
export { ProductSchema };
