import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

const Login: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.value);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('logowanie zakończona sukcesem');
    } catch (error) {
      console.log('Problem z logowaniem', error);
    }
  };

  
  return (
    <div className='flex items-center justify-center h-[80vh]'>
      <form onSubmit={handleSubmit} className='bg-white shadow-md p-12'>
        <h3 className='text-xl font-bold mb-4'>Sign In</h3>
        <div className='mb-4'>
          <label htmlFor='email' className='block mb-2'>
            Email:
          </label>
          <input
            className='w-full border border-gray-300 p-2'
            type='email'
            id='email'
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block mb-2'>
            Password
          </label>
          <input
            className='w-full border border-gray-300 p-2'
            type='password'
            id='password'
            value={password}
            onChange={handlePassword}
          />
        </div>
        <button className='bg-lime-400 py-3 px-5 my-2 transition hover:bg-lime-500 hover:text-white'>
          Enter!
        </button>
      </form>
    </div>
  );
};

export default Login;
