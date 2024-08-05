import { render, screen, fireEvent } from '@testing-library/react';
import ActorDetail from './ActorDetail';

test('renders actor detail and handles close', () => {
  const actor = { name: 'Luke Skywalker', height: '172', birth_year: '19BBY', gender: 'male' };
  const onClose = jest.fn();

  render(<ActorDetail actor={actor} onClose={onClose} />);

  expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
  expect(screen.getByText(/height: 172/i)).toBeInTheDocument();
  expect(screen.getByText(/birth year: 19bby/i)).toBeInTheDocument();
  expect(screen.getByText(/gender: male/i)).toBeInTheDocument();

  const closeButton = screen.getByText(/close/i);
  fireEvent.click(closeButton);

  expect(onClose).toHaveBeenCalled();
});
