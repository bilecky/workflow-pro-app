import React, { useState } from 'react'
import { Project } from '../../redux/projectSlice'
import { Link } from 'react-router-dom'
import { auth, database } from '../../firebase/firebaseConfig'

interface ProjectCardProps {
	project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const { name, date, description, participants, image, id } = project

	const [showTooltip, setShowTooltip] = useState(false)

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
		<div
			className='w-full sm:w-2/5 inline-block shadow-custom2 mr-6 hover:scale-95 hover:shadow-md transition-all overflow-hidden bg-zinc-600 cursor-pointer'
			onClick={handleCardClick}
		>
			{showTooltip && !currentUser && (
				<div className='bg-red-500 text-white text-sm absolute p-3   z-50'>
					Tylko dla zalogowanych użytkowników
				</div>
			)}{' '}
			{currentUser ? (
				<Link to={`/projects/${id}`}>
					<img
						className='w-full h-48 object-cover transform hover:scale-110 transition-all filter brightness-75 hue-rotate-60'
						src={image}
						alt={name}
					/>

					<div className='mt-4 p-4'>
						<h2 className='text-xl text-zinc-50 font-semibold'>{name}</h2>
						<p className='text-zinc-200 opacity-70'>{date}</p>
						<p className='text-zinc-200 whitespace-normal line-clamp-3'>{description}</p>
						<p className='text-zinc-200 mt-2'>Uczestnicy: {participants.length}</p>
					</div>
				</Link>
			) : (
				<div>
					<img
						className='w-full h-48 object-cover transform hover:scale-110 transition-all filter brightness-75 hue-rotate-60'
						src={image}
						alt={name}
					/>

					<div className='mt-4 p-4'>
						<h2 className='text-xl text-zinc-50 font-semibold'>{name}</h2>
						<p className='text-zinc-200 opacity-70'>{date}</p>
						<p className='text-zinc-200 whitespace-normal line-clamp-3'>{description}</p>
						<p className='text-zinc-200 mt-2'>Uczestnicy: {participants.length}</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default ProjectCard
