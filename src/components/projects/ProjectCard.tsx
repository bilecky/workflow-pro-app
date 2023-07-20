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
	const truncatedName = name.length >= 20 ? name.substring(0, 20) + "..." : name;

	return (
		<div
			className='xl:w-1/5 w-full sm:w-2/3 inline-block shadow-custom2 mr-6 hover:scale-95 hover:shadow-md transition-all overflow-hidden bg-zinc-600 cursor-pointer h-96'
			onClick={handleCardClick}
		>
			{showTooltip && !currentUser && (
				<div className='bg-red-500 text-white text-sm absolute p-3   z-50'>
					Details available for logged users!{' '}
				</div>
			)}{' '}
			{currentUser ? (
				<Link to={`/projects/${id}`}>
					<div className='relative'>
						<img
							className='w-full h-48 lg:w-full object-cover transform hover:scale-110 transition-all filter brightness-75 hue-rotate-60'
							src={image}
							alt={name}
						/>
						<div className='absolute top-0 left-0 w-full h-full bg-green-500 opacity-50'></div>
					</div>

					<div className='mt-4 p-4'>
						<h2 className='text-xl text-zinc-50 font-semibold'>{truncatedName}</h2>
						<p className='text-zinc-200 opacity-70'>{date}</p>
						<p className='text-zinc-200 whitespace-normal line-clamp-2 '>{description}</p>
						<p className='text-zinc-200  mt-1'>Participants: {participants.length}</p>
					</div>
				</Link>
			) : (
				<div>
					<div className='relative'>
						<img
							className='w-full h-48 lg:w-full object-cover transform hover:scale-110 transition-all filter brightness-75 hue-rotate-60'
							src={image}
							alt={name}
						/>
						<div className='absolute top-0 left-0 w-full h-full bg-green-500 opacity-50'></div>
					</div>

					<div className='mt-4 p-4'>
						<h2 className='text-xl text-zinc-50 font-semibold'>{truncatedName}</h2>
						<p className='text-zinc-200 opacity-70'>{date}</p>
						<p className='text-zinc-200 whitespace-normal line-clamp-2 '>{description}</p>
						<p className='text-zinc-200 mt-1'>
							Participants: <span className='font-bold'>{participants.length}</span>{' '}
						</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default ProjectCard
