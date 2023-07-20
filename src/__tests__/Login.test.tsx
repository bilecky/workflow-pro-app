import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/auth/Login';
import { store } from '../redux/store';
import '@testing-library/jest-dom/extend-expect';

describe('Login Component', () => {
  test('1. Poprawność renderowania komponentu', () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Enter!');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('2. Testing login with incorrect data', async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    // get inputs and button
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Enter!');

    // fill data
    fireEvent.change(emailInput, { target: { value: 'nieprawidlowy@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'nieprawidloweHaslo' } });

    // click button
    fireEvent.click(loginButton);

    // check if error is displayed
    await waitFor(() => {
      const errorText = getByText('Error! Check your email/password');
      expect(errorText).toBeInTheDocument();
    });
  });

});
