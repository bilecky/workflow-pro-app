import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../../redux/projectSlice'
import { AppDispatch } from '../../redux/store'
import { RootState } from '../../redux/store'
import HashLoader from 'react-spinners/HashLoader'
import ProjectCard from './ProjectCard'

const PopularProjects: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const projects = useSelector((state: RootState) => state.projects.data)
	const isLoading = useSelector((state: RootState) => state.projects.isLoading)
	const error = useSelector((state: RootState) => state.projects.error)

   const sortedProjects = projects.slice(0, 4).sort((a, b) => b.participants - a.participants);


	useEffect(() => {
		dispatch(fetchProjects())
	}, [dispatch])

	if (error) {
		return <p>Error: {error}</p>
	}

	return (
		<section className='text-center mt-20'>
			<h2 className='text-4xl font-bold'>
				<span className='relative'>
					Popular projects
					<span className='absolute -z-10 left-0 right-0 w-4/5 h-2 bottom-1 bg-green-500 opacity-50'></span>
				</span>
			</h2>

			{isLoading ? (
				<HashLoader className='m-auto mt-32' color='#00FF00' />
			) : (
				<div className='mt-10 gap-7 grid   md:grid-cols-2 lg:w-4/5 m-auto'>
					{sortedProjects.map(project => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			)}
		</section>
	)
}

export default PopularProjects
