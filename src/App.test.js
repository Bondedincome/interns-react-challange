import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import mockData from './mockData.json';
import { act } from 'react-dom/test-utils';


beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders list of actors', async () => {
  render(<App />);

  for (const actor of mockData.results) {
    expect(await screen.findByText(actor.name)).toBeInTheDocument();
    expect(await screen.findByText((content, element) => content.startsWith(`Height:`) && element.tagName.toLowerCase() === 'font')).toBeInTheDocument();
    expect(await screen.findByText(actor.height)).toBeInTheDocument();
    expect(await screen.findByText((content, element) => content.startsWith(`Birth Year:`) && element.tagName.toLowerCase() === 'font')).toBeInTheDocument();
    expect(await screen.findByText(actor.birth_year)).toBeInTheDocument();
  }
});

test('renders actor detail view on clicking "Detail" button', async () => {
  render(<App />);

  const detailButton = await screen.findAllByText(/detail/i);
  fireEvent.click(detailButton[0]);

  expect(await screen.findAllByText(/luke skywalker/i)).toHaveLength(2);
  expect(await screen.findByText((content, element) => content.startsWith(`Height:`) && element.tagName.toLowerCase() === 'font')).toBeInTheDocument();
  expect(await screen.findByText('172')).toBeInTheDocument();
  expect(await screen.findByText((content, element) => content.startsWith(`Birth Year:`) && element.tagName.toLowerCase() === 'font')).toBeInTheDocument();
  expect(await screen.findByText('19BBY')).toBeInTheDocument();
  expect(await screen.findByText((content, element) => content.startsWith(`Gender:`) && element.tagName.toLowerCase() === 'font')).toBeInTheDocument();
  expect(await screen.findByText('male')).toBeInTheDocument();
  await act(async () => {
    render(<App />);
  });
});
