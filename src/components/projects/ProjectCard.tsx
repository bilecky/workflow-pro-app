import React from 'react'
import { Project } from '../../redux/projectSlice'

interface ProjectCardProps {
	project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const { name, date, description, participants, img } = project

	return (
		<div className='w-full sm:w-2/5 inline-block shadow-custom2   mr-6 hover:scale-95 hover:shadow-md transition-all overflow-hidden bg-zinc-600 cursor-pointer '>
			<img
				className='w-full h-48 object-cover transform hover:scale-105 transition-all'
				src={img}
				alt={name}
			/>
			<div className='mt-4 p-4'>
				<h2 className='text-xl text-zinc-50 font-semibold'>{name}</h2>
				<p className='text-zinc-200 opacity-70 '>{date}</p>
        <p className='text-zinc-200  whitespace-normal line-clamp-3'>{description}</p>
				<p className='text-zinc-200 mt-2'>Participants: {participants}</p>
			</div>
		</div>
	)
}

export default ProjectCard
