import { screen, fireEvent } from '@testing-library/react';
import { render } from '@testing-library/react';
import { TypeFilter } from '../TypeFilter';

const mockTypes = ['fire', 'water', 'grass'];

describe('TypeFilter', () => {
  it('renders the "All" button', () => {
    render(
      <TypeFilter types={mockTypes} selectedType={null} onTypeSelect={() => {}} />,
    );
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('renders all provided type buttons', () => {
    render(
      <TypeFilter types={mockTypes} selectedType={null} onTypeSelect={() => {}} />,
    );
    expect(screen.getByText('Fire')).toBeInTheDocument();
    expect(screen.getByText('Water')).toBeInTheDocument();
    expect(screen.getByText('Grass')).toBeInTheDocument();
  });

  it('calls onTypeSelect with the type name when a type is clicked', () => {
    const handleSelect = vi.fn();
    render(
      <TypeFilter types={mockTypes} selectedType={null} onTypeSelect={handleSelect} />,
    );
    fireEvent.click(screen.getByText('Fire'));
    expect(handleSelect).toHaveBeenCalledWith('fire');
  });

  it('calls onTypeSelect with null when "All" is clicked', () => {
    const handleSelect = vi.fn();
    render(
      <TypeFilter types={mockTypes} selectedType="fire" onTypeSelect={handleSelect} />,
    );
    fireEvent.click(screen.getByText('All'));
    expect(handleSelect).toHaveBeenCalledWith(null);
  });

  it('deselects a type when the same type is clicked while selected', () => {
    const handleSelect = vi.fn();
    render(
      <TypeFilter types={mockTypes} selectedType="fire" onTypeSelect={handleSelect} />,
    );
    fireEvent.click(screen.getByText('Fire'));
    expect(handleSelect).toHaveBeenCalledWith(null);
  });

  it('"All" button has aria-pressed=true when no type is selected', () => {
    render(
      <TypeFilter types={mockTypes} selectedType={null} onTypeSelect={() => {}} />,
    );
    expect(screen.getByText('All')).toHaveAttribute('aria-pressed', 'true');
  });
});
