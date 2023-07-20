import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'; 
import Register from '../components/auth/Register';
import {store} from '../redux/store';
import '@testing-library/jest-dom/extend-expect'; 

describe('Register Component', () => {
  test('1. Poprawność renderowania komponentu', () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <Router> 
          <Register />
        </Router>
      </Provider>
    );


    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');
    const registerButton = getByText('Register!');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
});
