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
  const user = useSelector((state: RootState) => state.auth.value);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleAddProject = () => {
    navigate('/addproject');
  };

  return (
    <Wrapper>
      <div className='max-h-[1000px] py-10 lg:w-4/5 m-auto relative'>
        <div className='absolute left-0 top-0 w-full h-full bg-zinc-800 -z-10 opacity-60'></div>
        <div className='max-w-screen-lg px-4 text-center m-auto' >
          <h5 className='text-2xl text-white mb-4'>
            Hello, <span className='text-indigo-500 font-bold'>{user}</span>!
          </h5>

          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <ProjectList />
            </div>

            <div>
              <JoinedProjectsList />
            </div>
          </div>


          <button
            className='bg-indigo-500 transition-colors hover:bg-indigo-600 text-white py-2 px-4 mt-4 rounded'
            onClick={handleAddProject}
          >
            Add Project
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
