import React, { useState, useEffect } from 'react';
import { Project } from '../../redux/projectSlice'
import AddProject from './AddProject'
import ProjectList from './ProjectsList'
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';


const Dashboard = () => {
   const navigate = useNavigate();
   const user = useSelector((state: RootState) => state.auth.value);


   useEffect(() => {
      if (!user) {
        navigate('/');
      }
    }, [navigate, user]);
	
   
    return (

		<div>

<ProjectList/>

			<AddProject />
		</div>
	)
}

export default Dashboard
