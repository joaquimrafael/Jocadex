import { screen, fireEvent } from '@testing-library/react';
import { render } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders with the default placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(
      screen.getByPlaceholderText('Search Pokémon by name...'),
    ).toBeInTheDocument();
  });

  it('renders with a custom placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} placeholder="Find Pokémon" />);
    expect(screen.getByPlaceholderText('Find Pokémon')).toBeInTheDocument();
  });

  it('calls onChange when the user types', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'pikachu' } });
    expect(handleChange).toHaveBeenCalledWith('pikachu');
  });

  it('displays the current value', () => {
    render(<SearchBar value="bulbasaur" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('bulbasaur');
  });

  it('has an accessible label', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByRole('textbox', { name: /search pokémon/i })).toBeInTheDocument();
  });
});
