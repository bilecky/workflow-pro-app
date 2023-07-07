import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../../redux/projectSlice'
import { AppDispatch } from '../../redux/store'
import { RootState } from '../../redux/store'
import HashLoader from 'react-spinners/HashLoader'

const PopularProjects = () => {
	const dispatch: AppDispatch = useDispatch()
	const projects = useSelector((state: RootState) => state.projects.data)
	const isLoading = useSelector((state: RootState) => state.projects.isLoading)
	const error = useSelector((state: RootState) => state.projects.error)

	useEffect(() => {
		dispatch(fetchProjects())
	}, [dispatch])

	if (error) {
		return <p>Error: {error}</p>
	}

	console.log(projects)

	return (
		<section className='text-center mt-20'>
			<h2 className='text-4xl font-bold'>
				<span className='relative'>
					Popular projects
					<span className='absolute -z-10 left-0 right-0 w-4/5 h-2 bottom-1 bg-green-500 opacity-50'></span>
				</span>
			</h2>

			{isLoading ? <HashLoader className='text-center' color='#00FF00' /> : error}
		</section>
	)
}

export default PopularProjects
