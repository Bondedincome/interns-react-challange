import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  fetch.mockClear();
});

test('renders loading state initially', () => {
  fetch.mockResolvedValueOnce({
    json: () => Promise.resolve({ results: [] }),
  });

  render(<App />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('renders error state on fetch failure', async () => {
  fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

  render(<App />);
  expect(await screen.findByText(/error/i)).toBeInTheDocument();
});

test('renders list of actors', async () => {
  const mockData = {
    results: [
      { name: 'Luke Skywalker', height: '172', birth_year: '19BBY' },
      { name: 'Darth Vader', height: '202', birth_year: '41.9BBY' },
    ],
  };

  fetch.mockResolvedValueOnce({
    json: () => Promise.resolve(mockData),
  });

  render(<App />);
  expect(await screen.findByText(/actor list/i)).toBeInTheDocument();

  for (const actor of mockData.results) {
    expect(await screen.findByText(actor.name)).toBeInTheDocument();
    expect(await screen.findByText(`Height: ${actor.height}`)).toBeInTheDocument();
    expect(await screen.findByText(`Birth Year: ${actor.birth_year}`)).toBeInTheDocument();
  }
});

test('renders actor detail view on clicking "Detail" button', async () => {
  const mockData = {
    results: [
      { name: 'Luke Skywalker', height: '172', birth_year: '19BBY', gender: 'male' }
    ]
  };

  fetch.mockResolvedValueOnce({
    json: () => Promise.resolve(mockData),
  });

  render(<App />);
  expect(await screen.findByText(/actor list/i)).toBeInTheDocument();

  const detailButton = await screen.findAllByText(/detail/i);
  fireEvent.click(detailButton[0]);

  expect(await screen.findByText(/luke skywalker/i)).toBeInTheDocument();
  expect(await screen.findByText(/height: 172/i)).toBeInTheDocument();
  expect(await screen.findByText(/birth year: 19bby/i)).toBeInTheDocument();
  expect(await screen.findByText(/gender: male/i)).toBeInTheDocument();

  const closeButton = await screen.findByText(/close/i);
  fireEvent.click(closeButton);

  await waitFor(() => {
    expect(screen.queryByText(/luke skywalker/i)).not.toBeInTheDocument();
  });
});
