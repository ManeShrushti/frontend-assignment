import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/Main/Main', () => () => <div role="main-component">Mocked Main Component</div>);

describe('App Component', () => {
  test('renders Main component inside App', () => {
    render(<App />); // Render App, which contains the mocked Main component
    
    // Check if Main component (mocked version) is rendered inside App
    expect(screen.getByRole('main-component')).toHaveTextContent('Mocked Main Component');
  });
});
