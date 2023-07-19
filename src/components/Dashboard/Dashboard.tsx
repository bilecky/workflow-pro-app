import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AddProject from './AddProject';
import ProjectList from './ProjectsList';
import JoinedProjectsList from './JoinedProjectsList';
import Wrapper from '../../helpers/Wrapper';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.value)!;

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleAddProject = () => {
    navigate('/addproject');
  };

  const originalString = user as string;
  const userDeepCopy = originalString.split('@')[0];


  return (
    <Wrapper>
      <div className='max-h-[1200px] py-10 lg:w-4/5 m-auto relative'>
        <div className='absolute left-0 top-0 w-full h-full bg-zinc-800 -z-10 opacity-60'></div>
        <div className='max-w-screen-lg px-4 text-center m-auto' >
          <h5 className='text-2xl sm:text-4xl text-white '>
            Hello, <span className='text-indigo-500 font-bold sm:inline overflow-auto'>{userDeepCopy}</span>!
          </h5>
          <button
            className='bg-indigo-500 transition-colors hover:bg-indigo-600 text-white py-3 px-10 m-12 '
            onClick={handleAddProject}
          >
            Add Project
          </button>
          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <ProjectList />
            </div>

            <div>
              <JoinedProjectsList />
            </div>
          </div>


        
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
