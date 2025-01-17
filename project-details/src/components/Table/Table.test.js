import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './Table';
import '@testing-library/jest-dom';

const mockData = [
  { "s_no": 0, "percentage_funded": '385', "amt_pledged": '192915' },
  { "s_no": 1, "percentage_funded": '90', "amt_pledged": '11590' },
  { "s_no": 2, "percentage_funded": '77', "amt_pledged": '12856' },
  { "s_no": 3, "percentage_funded": '55', "amt_pledged": '12345' },
  { "s_no": 4, "percentage_funded": '33', "amt_pledged": '67890' },
];

describe('Table Component', () => {
  
  test('renders table with data', () => {
    render(<Table data={mockData} />);
    
    expect(screen.getByRole('table')).toBeInTheDocument();
    
    expect(screen.getByRole('columnheader', { name: /serial number header/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /percentage funded header/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /amount pledged header/i })).toBeInTheDocument();
    
    mockData.forEach((project) => {
      expect(screen.getByText(project.s_no)).toBeInTheDocument();
      expect(screen.getByText(project.percentage_funded)).toBeInTheDocument();
      expect(screen.getByText(project.amt_pledged)).toBeInTheDocument();
    });
  });

  test('renders "No data" message when data is empty', () => {
    render(<Table data={[]}/>);
    
    expect(screen.getByText(/No data/i)).toBeInTheDocument();
  });

  test('has correct ARIA roles for accessibility', () => {
    render(<Table data={mockData} />);
    
    const table = screen.getByRole('table');
    expect(table).toHaveAttribute('aria-label', 'Kickstarter Projects Table');
    
    const rows = screen.getAllByRole('data-row');
    expect(rows).toHaveLength(mockData.length + 1); 
  });

});
