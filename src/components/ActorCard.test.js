import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActorCard from './ActorCard';

test('renders actor card with details', () => {
  const actor = {
    name: 'Luke Skywalker',
    height: '172',
    birth_year: '19BBY',
  };
  const handleDetail = jest.fn();

  render(<ActorCard actor={actor} onDetail={handleDetail} />);

  expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
  expect(screen.getByText((content, element) => content.startsWith('Height:') && element.tagName.toLowerCase() === 'font')).toBeInTheDocument();
  expect(screen.getByText('172')).toBeInTheDocument();
  expect(screen.getByText((content, element) => content.startsWith('Birth Year:') && element.tagName.toLowerCase() === 'font')).toBeInTheDocument();
  expect(screen.getByText('19BBY')).toBeInTheDocument();

  fireEvent.click(screen.getByText(/detail/i));
  expect(handleDetail).toHaveBeenCalledTimes(1);
});
