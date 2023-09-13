import { URLProps } from './Interfaces';
import { baseURL } from '../constants/general';

export const fullURL = ({ currentState }: URLProps) => {
  const url = new URL(
    `${baseURL}/${
      currentState.products.searchValue.length > 1
        ? 'products/search'
        : 'products'
    }`,
  );
  if (currentState.products.searchValue.length > 1) {
    url.searchParams.set('q', currentState.products.searchValue);
  }
  url.searchParams.set('limit', String(currentState.products.data.limit));
  url.searchParams.set('skip', String(currentState.products.data.skip));
  return url;
};
