import { render, screen, fireEvent } from '@testing-library/react';
import ActorCard from './ActorCard';

test('renders actor card with details', () => {
  const actor = { name: 'Luke Skywalker', height: '172', birth_year: '19BBY' };
  const onDetail = jest.fn();

  render(<ActorCard actor={actor} onDetail={onDetail} />);

  expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
  expect(screen.getByText(/height: 172/i)).toBeInTheDocument();
  expect(screen.getByText(/birth year: 19bby/i)).toBeInTheDocument();

  const detailButton = screen.getByText(/detail/i);
  fireEvent.click(detailButton);

  expect(onDetail).toHaveBeenCalled();
});
