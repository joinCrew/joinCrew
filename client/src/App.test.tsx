import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders joinCrew text', () => {
  render(<App />); 

  const linkElement = screen.getByText(/joinCrew/i); 
  expect(linkElement).toBeInTheDocument(); 
});