import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Main from './Main';
import { fetchData } from '../../services/baseService';
import { replaceDotWithUnderscore } from '../../utils/utils';

jest.mock('../../services/baseService');
jest.mock('../../utils/utils');
jest.mock('../Table/Table', () => () => <div role="table">Table Mocked</div>);

// Mock data for testing
const mockData = [
  { "s.no": 0, "percentage.funded": '385', "amt.pledged": '192915' },
  { "s.no": 1, "percentage.funded": '90', "amt.pledged": '11590' },
  { "s.no": 2, "percentage.funded": '77', "amt.pledged": '12856' },
  { "s.no": 3, "percentage.funded": '55', "amt.pledged": '12345' },
  { "s.no": 4, "percentage.funded": '33', "amt.pledged": '67890' },
];

describe('Main Component', () => {
  
  beforeEach(() => {
    fetchData.mockResolvedValue(mockData);
    replaceDotWithUnderscore.mockImplementation((data) => data);
  });
  
  test('renders Main component and displays data after fetch', async () => {
    render(<Main />);
    
    await waitFor(() => fetchData.mock.calls.length > 0);
    expect(screen.getByText(/Discover Top Kickstarter Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore highly-rated projects/i)).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('displays error message when data fails to load', async () => {
    fetchData.mockRejectedValueOnce(new Error('Error loading data'));
    render(<Main />);
    
    await waitFor(() => screen.getByText(/Oops.. Encountered error while fetching data!/i));
    
    expect(screen.getByText(/Oops.. Encountered error while fetching data!/i)).toBeInTheDocument();
  });

  test('pagination updates display data on page change', async () => {
    render(<Main />);
    
    await waitFor(() => screen.getByText(/Kickstarter Projects/i));
    
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
    
    const nextButton = screen.getByLabelText(/Next Page/i);
    fireEvent.click(nextButton);
    
    await waitFor(() => screen.getByText('Page 1 of 1'));
    
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
  });

  test('pagination updates correctly when there are multiple pages', async () => {
    const largeMockData = [
      { "s.no": 0, "percentage.funded": '100', "amt.pledged": '1000' },
      { "s.no": 1, "percentage.funded": '90', "amt.pledged": '2000' },
      { "s.no": 2, "percentage.funded": '80', "amt.pledged": '3000' },
      { "s.no": 3, "percentage.funded": '70', "amt.pledged": '4000' },
      { "s.no": 4, "percentage.funded": '60', "amt.pledged": '5000' },
      { "s.no": 5, "percentage.funded": '50', "amt.pledged": '6000' },
      { "s.no": 6, "percentage.funded": '40', "amt.pledged": '7000' },
    ];

    fetchData.mockResolvedValue(largeMockData);
    render(<Main />);

    await waitFor(() => screen.getByText(/Kickstarter Projects/i));

    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    
    const nextButton = screen.getByLabelText(/Next Page/i);
    fireEvent.click(nextButton);
    
    await waitFor(() => screen.getByText('Page 2 of 2'));
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
  });
});
