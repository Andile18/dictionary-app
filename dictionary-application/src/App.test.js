import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

test('renders the dictionary search field', () => {
  render(<App />);
  expect(screen.getByRole('searchbox')).toBeInTheDocument();
});

test('shows a definition after searching', async () => {
  axios.get.mockResolvedValue({
    data: [{
      word: 'bright',
      phonetics: [],
      meanings: [{
        partOfSpeech: 'adjective',
        definitions: [{ definition: 'Giving out or reflecting a lot of light.' }],
      }],
    }],
  });

  render(<App />);
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'bright' } });
  fireEvent.submit(screen.getByRole('searchbox').closest('form'));

  await waitFor(() => {
    expect(screen.getByText('Giving out or reflecting a lot of light.')).toBeInTheDocument();
  });
});
