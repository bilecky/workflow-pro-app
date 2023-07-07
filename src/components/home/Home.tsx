import React from 'react';
import { AiOutlineUser, AiOutlineProject, AiOutlineLike } from 'react-icons/ai';
import Wrapper from '../../wrapper';

const Home: React.FC = () => {
  return (
    <main>
      <Wrapper>
        <section className='text-center mt-16'>
          <h1 className='text-4xl font-bold'>
            <span className='relative'>
              Weekly stats{' '}
              <span className='absolute -z-10 left-0 right-0 w-4/5 h-2 bottom-1 bg-green-500 opacity-50'></span>
            </span>
          </h1>
          <div className='flex mt-10 space-x-8 lg:w-2/3 m-auto'>
            <div className='flex-1'>
              <div className='border-b-4 border-gray-300 rounded-lg p-4 min-h-full'>
                <div className='flex items-center justify-center mb-4'>
                  <AiOutlineUser className='text-4xl' />
                </div>
                <p className='text-4xl font-bold'>2</p>
                <p className='text-gray-600'>New Users</p>
              </div>
            </div>
            <div className='flex-1 sm:w-1/5 lg:w-1/3'>
              <div className='border-b-4 border-gray-300 rounded-lg p-4 min-h-full'>
                <div className='flex items-center justify-center mb-4'>
                  <AiOutlineProject className='text-4xl' />
                </div>
                <p className='text-4xl font-bold'>5</p>
                <p className='text-gray-600'>New Projects</p>
              </div>
            </div>
            <div className='flex-1 sm:w-1/5 lg:w-1/3'>
              <div className='border-b-4 border-gray-300 rounded-lg p-4 min-h-full'>
                <div className='flex items-center justify-center mb-4'>
                  <AiOutlineLike className='text-4xl' />
                </div>
                <p className='text-4xl font-bold'>3</p>
                <p className='text-gray-600'>New Likes</p>
              </div>
            </div>
            <div className='hidden lg:flex flex-1 sm:w-1/5 lg:w-1/3'>
              <div className='border-b-4 border-gray-300 rounded-lg p-4 min-h-full'>
                <div className='flex items-center justify-center mb-4'>
                  <AiOutlineLike className='text-4xl' />
                </div>
                <p className='text-4xl font-bold'>7</p>
                <p className='text-gray-600'>New Element</p>
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
    </main>
  );
};

export default Home;
