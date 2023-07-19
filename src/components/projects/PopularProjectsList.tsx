import React, { useEffect, useRef, useState } from 'react'
import { Project } from '../../redux/projectSlice'
import { AppDispatch } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../../redux/projectSlice'
import { Link } from 'react-router-dom'
import { FiUsers } from 'react-icons/fi'
import { RootState } from '../../redux/store'
import Wrapper from '../../helpers/Wrapper'

const PopularProjectsList: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const projects = useSelector((state: RootState) => state.projects.data)

	const sortedProjects = projects
		.slice(0, -1)
		.sort(
			(a, b) => Object.keys(b.participants).length - Object.keys(a.participants).length
		)

	useEffect(() => {
		dispatch(fetchProjects())
	}, [])

	return (
		<Wrapper>
		<h2 className='text-center my-20 text-4xl font-bold text-indigo-50 tracking-wide'>
		  <span className='relative '>
			 Popular Projects{' '}
			 <span className='absolute -z-10 left-0 right-0 w-4/5 h-2 bottom-1 bg-lime-400 opacity-60'></span>
		  </span>
		</h2>
		<div className='min-h-[800px] grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:w-4/5 m-auto '>
		  {sortedProjects.map(project => (
			 <Link to={`/projects/${project.id}`} key={project.id}>
				<div
				  className='bg-zinc-300  shadow-custom p-4 mb-4 hover:scale-95 transition-all text-center h-[400px]'
				>
				  <img
					 src={project.image}
					 alt={project.name}
					 className='object-cover h-40 w-full mb-4 rounded'
				  />
				  <h3 className='text-xl font-semibold mb-2'>{project.name}</h3>
				  <p className='text-gray-500 mb-2 line-clamp-4'>{project.description}</p>
				  <div className='flex items-center justify-center'>
					 <FiUsers /> <span className='ml-2'>{project.participants.length}</span>
				  </div>
				</div>
			 </Link>
		  ))}
		</div>
	 </Wrapper>
	)
}

export default PopularProjectsList
