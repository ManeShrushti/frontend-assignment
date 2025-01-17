import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import '@testing-library/jest-dom';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();
  const currentPage = 2;
  const totalPages = 5;

  test('renders pagination with current page and total pages', () => {
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={mockOnPageChange} />);
    
    expect(screen.getByText(`Page ${currentPage} of ${totalPages}`)).toBeInTheDocument();
    
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
    expect(screen.getByText(/first/i)).toBeInTheDocument();
    expect(screen.getByText(/last/i)).toBeInTheDocument();
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('handles page change when next button is clicked', () => {
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={mockOnPageChange} />);
    
    fireEvent.click(screen.getByText(/next/i));
    
    expect(mockOnPageChange).toHaveBeenCalledWith(currentPage + 1);
  });

  test('handles page change when previous button is clicked', () => {
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={mockOnPageChange} />);
    
    fireEvent.click(screen.getByText(/previous/i));
    
    expect(mockOnPageChange).toHaveBeenCalledWith(currentPage - 1);
  });

  test('handles page change when first button is clicked', () => {
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={mockOnPageChange} />);
    
    fireEvent.click(screen.getByText(/first/i));
    
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  test('handles page change when last button is clicked', () => {
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={mockOnPageChange} />);
    
    fireEvent.click(screen.getByText(/last/i));
    
    expect(mockOnPageChange).toHaveBeenCalledWith(totalPages);
  });

  test('highlights active page number', () => {
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={mockOnPageChange} />);
    
    expect(screen.getByText(`${currentPage}`)).toHaveClass('active');
  });

  test('has correct ARIA roles for accessibility', () => {
    render(<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={mockOnPageChange} />);
    
    const firstButton = screen.getByText(/first/i);
    expect(firstButton).toHaveAttribute('aria-label', 'First Page');
    
    const prevButton = screen.getByText(/previous/i);
    expect(prevButton).toHaveAttribute('aria-label', 'Previous Page');
    
    const nextButton = screen.getByText(/next/i);
    expect(nextButton).toHaveAttribute('aria-label', 'Next Page');
    
    const lastButton = screen.getByText(/last/i);
    expect(lastButton).toHaveAttribute('aria-label', 'Last Page');
  });

  test('handles case when there are no pages', () => {
    render(<Pagination currentPage={1} totalPages={0} onPageChange={mockOnPageChange} />);
    
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /first/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /last/i })).toBeDisabled();
  });
  
  test('generates correct page numbers based on current page and total pages', () => {
    render(<Pagination currentPage={4} totalPages={10} onPageChange={mockOnPageChange} />);
    
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });
  
});
