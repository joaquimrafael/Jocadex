import { screen, fireEvent } from '@testing-library/react';
import { render } from '@testing-library/react';
import { TypeFilter } from '../TypeFilter';

const mockTypes = ['fire', 'water', 'grass'];

describe('TypeFilter', () => {
  it('renders the "All" button', () => {
    render(
      <TypeFilter types={mockTypes} selectedTypes={[]} onTypeSelect={() => {}} />,
    );
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('renders all provided type buttons', () => {
    render(
      <TypeFilter types={mockTypes} selectedTypes={[]} onTypeSelect={() => {}} />,
    );
    expect(screen.getByText('Fire')).toBeInTheDocument();
    expect(screen.getByText('Water')).toBeInTheDocument();
    expect(screen.getByText('Grass')).toBeInTheDocument();
  });

  it('calls onTypeSelect with the type added when an unselected type is clicked', () => {
    const handleSelect = vi.fn();
    render(
      <TypeFilter types={mockTypes} selectedTypes={[]} onTypeSelect={handleSelect} />,
    );
    fireEvent.click(screen.getByText('Fire'));
    expect(handleSelect).toHaveBeenCalledWith(['fire']);
  });

  it('calls onTypeSelect with empty array when "All" is clicked', () => {
    const handleSelect = vi.fn();
    render(
      <TypeFilter types={mockTypes} selectedTypes={['fire']} onTypeSelect={handleSelect} />,
    );
    fireEvent.click(screen.getByText('All'));
    expect(handleSelect).toHaveBeenCalledWith([]);
  });

  it('removes a type when the same type is clicked while selected', () => {
    const handleSelect = vi.fn();
    render(
      <TypeFilter types={mockTypes} selectedTypes={['fire']} onTypeSelect={handleSelect} />,
    );
    fireEvent.click(screen.getByText('Fire'));
    expect(handleSelect).toHaveBeenCalledWith([]);
  });

  it('adds a second type to the selection', () => {
    const handleSelect = vi.fn();
    render(
      <TypeFilter types={mockTypes} selectedTypes={['fire']} onTypeSelect={handleSelect} />,
    );
    fireEvent.click(screen.getByText('Water'));
    expect(handleSelect).toHaveBeenCalledWith(['fire', 'water']);
  });

  it('"All" button has aria-pressed=true when no type is selected', () => {
    render(
      <TypeFilter types={mockTypes} selectedTypes={[]} onTypeSelect={() => {}} />,
    );
    expect(screen.getByText('All')).toHaveAttribute('aria-pressed', 'true');
  });

  it('"All" button has aria-pressed=false when a type is selected', () => {
    render(
      <TypeFilter types={mockTypes} selectedTypes={['fire']} onTypeSelect={() => {}} />,
    );
    expect(screen.getByText('All')).toHaveAttribute('aria-pressed', 'false');
  });

  it('selected type button has aria-pressed=true', () => {
    render(
      <TypeFilter types={mockTypes} selectedTypes={['fire']} onTypeSelect={() => {}} />,
    );
    expect(screen.getByRole('button', { name: 'Filter by fire' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('multiple types can be selected simultaneously', () => {
    render(
      <TypeFilter types={mockTypes} selectedTypes={['fire', 'water']} onTypeSelect={() => {}} />,
    );
    expect(screen.getByRole('button', { name: 'Filter by fire' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Filter by water' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Filter by grass' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });
});
