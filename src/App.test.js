import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the title element', () => {
  render(<App />);
  const titleElement = screen.getByText(/My Tasks Lists/i);
  expect(titleElement).toBeInTheDocument();
});

