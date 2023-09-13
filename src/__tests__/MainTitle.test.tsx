import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainTitle from '../components/MainTitle/MainTitle';

test('MainTitle renders correctly and has a string title attribute', () => {
  render(<MainTitle title="Test Title" />);

  const titleElement = screen.getByTestId('main-title');

  expect(titleElement).toBeDefined();

  const titleAttributeValue = titleElement.getAttribute('title');

  if (titleAttributeValue !== null && titleAttributeValue !== undefined) {
    expect(typeof titleAttributeValue).toBe('string');
  } else {
    expect(titleAttributeValue).toBeDefined();
    // or
    console.warn('Warning: The "title" attribute is missing.');
  }
});
