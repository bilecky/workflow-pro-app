import React, { useState } from 'react'
import { auth } from '../../firebase/firebaseConfig'

import { Link } from 'react-router-dom'
import { FiUsers } from 'react-icons/fi'
import { Project } from '../../redux/projectSlice'

interface SingleProjectProps {
	sortedProjects: Project[]
}

const SingleProject: React.FC<SingleProjectProps> = ({ sortedProjects }) => {
	const [showTooltip, setShowTooltip] = useState<boolean>(false)

	const currentUser = auth.currentUser

	const handleCardClick = () => {
		if (!currentUser) {
			setShowTooltip(true)
			setTimeout(() => {
				setShowTooltip(false)
			}, 2000)
		}
	}

	return (
		<div>
			{currentUser ? (
				<div className='min-h-[800px] grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:w-4/5 m-auto '>
					{sortedProjects.map(project => (
						<Link to={`/projects/${project.id}`} key={project.id}>
							<div className='bg-zinc-300  shadow-custom  mb-4 hover:scale-95 transition-all text-center h-[400px] '>
								<div className='relative'>
									<img
										className='w-full h-48 lg:w-full object-cover transform hover:scale-110 transition-all filter brightness-75 hue-rotate-60'
										src={project.image}
										alt={project.name}
									/>
									<div className='absolute top-0 left-0 w-full h-full bg-green-500 opacity-50'></div>
								</div>
								<h3 className=' px-2 text-xl font-semibold mt-3 mb-3'>{project.name}</h3>
								<p className='text-gray-500 mb-2 line-clamp-4 px-2 '>
									{project.description}
								</p>
								<div className=' px-2 flex items-center justify-center'>
									<FiUsers /> <span className='ml-2'>{project.participants.length}</span>
								</div>
							</div>
						</Link>
					))}
				</div>
			) : (
				<div className='min-h-[800px] grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:w-4/5 m-auto '>
					{sortedProjects.map(project => (
						<div
							key={project.id}
							onClick={handleCardClick}
							className='bg-zinc-300  shadow-custom  mb-4 hover:scale-95 cursor-pointer transition-all text-center h-[400px] relative'
						>
							{showTooltip && !currentUser && (
								<div className='bg-red-500 text-white text-sm absolute p-3   z-50'>
									Details available for logged users!{' '}
								</div>
							)}{' '}
							<div className='relative'>
								<img
									className='w-full h-48 lg:w-full object-cover transform hover:scale-110 transition-all filter brightness-75 hue-rotate-60'
									src={project.image}
									alt={project.name}
								/>
								<div className='absolute top-0 left-0 w-full h-full bg-green-500 opacity-50'></div>
							</div>
							<h3 className=' px-2 text-xl font-semibold mt-2 mb-2'>{project.name}</h3>
							<p className='text-gray-500 mb-2 line-clamp-4 px-2 '>
								{project.description}
							</p>
							<div className=' px-2 flex items-center justify-center'>
								<FiUsers /> <span className='ml-2'>{project.participants.length}</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default SingleProject
