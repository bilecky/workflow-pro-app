import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../../redux/projectSlice'
import { AppDispatch } from '../../redux/store'
import { RootState } from '../../redux/store'
import HashLoader from 'react-spinners/HashLoader'
import ProjectCard from './ProjectCard'
import { Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const NewProjects: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const projects = useSelector((state: RootState) => state.projects.data)
	const isLoading = useSelector((state: RootState) => state.projects.isLoading)
	const error = useSelector((state: RootState) => state.projects.error)

	const [scrollOffset, setScrollOffset] = useState<number>(0)
	const sliderRef = useRef<HTMLDivElement>(null)

	const sortedProjects = projects
		.slice(0, 8)
		.sort((a, b) => b.participants.length - a.participants.length)

	useEffect(() => {
		dispatch(fetchProjects())
	}, [dispatch])

	if (error) {
		return (
			<div className='m-20 flex items-center justify-center'>
				<p className='text-red-500 text-lg font-bold'>{`Error: ${error}`}</p>
			</div>
		)
	}

	const handleScrollLeft = () => {
		if (sliderRef.current) {
			const container = sliderRef.current

			container.scrollLeft -= 250
			setScrollOffset(container.scrollLeft)
		}
	}

	const handleScrollRight = () => {
		if (sliderRef.current) {
			const container = sliderRef.current
			container.scrollLeft += 250
			setScrollOffset(container.scrollLeft)
		}
	}
	return (
		<section className='text-center mt-20 '>
			<h2 className='text-4xl font-bold text-indigo-50 tracking-wide'>
				<span className='relative '>
					New Projects{' '}
					<span className='absolute -z-10 left-0 right-0 w-4/5 h-2 bottom-1 bg-lime-400 opacity-60'></span>
				</span>
			</h2>
			{isLoading ? (
				<HashLoader
					className='m-auto mt-32 flex items-center justify-center'
					color='#84cc16'
				/>
			) : (
				<div className='mt-16 relative flex items-center '>
					<FaChevronLeft
						className='text-indigo-50 cursor-pointer p-1 '
						size={26}
						onClick={handleScrollLeft}
					/>
					<div
						ref={sliderRef}
						style={{ touchAction: 'pan-x', WebkitOverflowScrolling: 'touch' }}
						id='slider'
						className='w-full  h-full overflow-x-scroll sm:overflow-x-hidden mx-3 scroll whitespace-nowrap scroll-smooth'
					>
						{sortedProjects.map(project => (
							<ProjectCard key={project.id} project={project} />
						))}
					</div>
					<FaChevronRight
						className='text-indigo-50 cursor-pointer p-1 '
						size={26}
						onClick={handleScrollRight}
					/>
				</div>
			)}

			{projects.length > 4 && (
				<Link to='/projects' className='mt-4 inline-block'>
					<button className='bg-lime-400 transition-all hover:text-zinc-100 hover:bg-lime-600 text-zinc-600 font-bold py-2 px-4  mt-10'>
						Show more{' '}
					</button>
				</Link>
			)}
		</section>
	)
}

export default NewProjects