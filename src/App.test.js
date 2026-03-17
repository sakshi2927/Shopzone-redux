import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';

test('renders shopzone navbar brand', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const heading = screen.getByText(/shopzone/i);
  expect(heading).toBeInTheDocument();
});
