import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../../redux/projectSlice'
import { AppDispatch } from '../../redux/store'
import { RootState } from '../../redux/store'
import HashLoader from 'react-spinners/HashLoader'
import ProjectCard from './ProjectCard'
import { Link } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const PopularProjects: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const projects = useSelector((state: RootState) => state.projects.data)
	const isLoading = useSelector((state: RootState) => state.projects.isLoading)
	const error = useSelector((state: RootState) => state.projects.error)

	const sliderRef = useRef<HTMLDivElement>(null)

	const sortedProjects = [...projects]
		.sort(
			(a, b) => Object.keys(b.participants).length - Object.keys(a.participants).length
		)
		.slice(0, 8)

	useEffect(() => {
		dispatch(fetchProjects())
	}, [dispatch])

	if (error) {
		return (
			<div className='mt-20 flex items-center justify-center'>
				<p className='text-red-500 text-lg font-bold'>{`Error: ${error}`}</p>
			</div>
		)
	}

	const handleScrollLeft = () => {
		if (sliderRef.current) {
			const container = sliderRef.current

			container.scrollLeft -= 250
		}
	}

	const handleScrollRight = () => {
		if (sliderRef.current) {
			const container = sliderRef.current
			container.scrollLeft += 250
		}
	}
	return (
		<section className='text-center mt-20 '>
			<h2 className='text-4xl font-bold text-indigo-50'>
				<span className='relative '>
					Popular projects
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
						className='w-full  h-full overflow-x-auto scrollbar-hide sm:overflow-x-hidden mx-3 scroll whitespace-nowrap scroll-smooth'
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
				<Link to='/popularprojectslist' className='mt-4 inline-block'>
					<button className='bg-lime-400 transition-all hover:text-zinc-50 hover:bg-lime-600 text-zinc-800 py-2 px-4  mt-10 tracking-wider text-lg hover:scale-110'>
						Show more{' '}
					</button>
				</Link>
			)}
		</section>
	)
}

export default PopularProjects
