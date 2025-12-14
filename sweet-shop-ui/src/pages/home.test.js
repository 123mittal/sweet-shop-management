import { render, screen } from '@testing-library/react';
import api from '../api/axios';
import { Home } from './Home';
import { vi } from 'vitest';

// Mock API
vi.mock('../api/axios');

describe('Home Page', () => {
  test('renders Home component heading', () => {
    render(<Home />);
    const heading = screen.getByText(/sweets/i);
    expect(heading).toBeInTheDocument();
  });

  test('fetches and displays sweets', async () => {
    const mockData = [
      { id: 1, name: 'Gulab Jamun', price: 50, image: 'url1' },
      { id: 2, name: 'Rasgulla', price: 40, image: 'url2' },
    ];

    api.get.mockResolvedValue({ data: mockData });

    render(<Home />);

    const sweet1 = await screen.findByText('Gulab Jamun');
    const sweet2 = await screen.findByText('Rasgulla');

    expect(sweet1).toBeInTheDocument();
    expect(sweet2).toBeInTheDocument();
  });
});
