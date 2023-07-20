import React, { useEffect } from 'react'
import { AppDispatch } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../../redux/projectSlice'
import { RootState } from '../../redux/store'
import Wrapper from '../../helpers/Wrapper'
import SingleProject from './SingleProject'

const PopularProjectsList: React.FC = () => {
	const dispatch: AppDispatch = useDispatch()
	const projects = useSelector((state: RootState) => state.projects.data)

	const sortedProjects = projects
		.slice()
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
					Popular Projects List{' '}
					<span className='absolute -z-10 left-0 right-0 w-4/5 h-2 bottom-1 bg-lime-400 opacity-60'></span>
				</span>
			</h2>

			<SingleProject  sortedProjects={sortedProjects} />
		</Wrapper>
	)
}

export default PopularProjectsList
