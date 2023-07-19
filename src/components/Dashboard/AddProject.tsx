import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Project, Participant } from '../../redux/projectSlice'
import { auth, database } from '../../firebase/firebaseConfig'
import { addDoc, collection, CollectionReference } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import Wrapper from '../../helpers/Wrapper'
import { FiArrowLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router'

interface AddProjectProps {}

const AddProject: React.FC<AddProjectProps> = () => {
	const navigate = useNavigate()
	const [project, setProject] = useState<Project>({
		id: '',
		name: '',
		description: '',
		image: '',
		participants: [],
		authorId: '',
		date: '',
	})

	useEffect(() => {}, [project])
	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target

		setProject(prevProject => ({
			...prevProject,
			[name]: value,
		}))
	}

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()

		try {
			const projectsCollectionRef: CollectionReference = collection(database, 'projects')
			const user = auth.currentUser

			if (user) {
				const date = new Date()

				const currentDate = date.toISOString().split('T')[0]

				const projectName = project.name.trim()
				const descriptionName = project.description.trim()

				if (projectName.length < 5 || projectName.length > 25) {
					alert('The project name must be between 5 and 25 characters long.')
					return
				}
				if (descriptionName.length < 20 || descriptionName.length > 700) {
					alert('The project description must be between 20 and 700 characters long.')
					return
				}

				const newParticipant: Participant = { email: user.email, timeSpend: 0 } //changing particiapnt structure
				const newProject: Project = {
					id: uuidv4(),
					name: project.name,
					description: project.description,
					image: project.image,
					authorId: user.uid,
					participants: [newParticipant], // new participant array
					date: currentDate,
				}

				await addDoc(projectsCollectionRef, newProject)
				navigate('/dashboard')
			}
		} catch (error) {
			return
		}
	}
	const handleGoBack = () => {
		navigate('/dashboard') //
	}
	const style = {
		height: 'calc(100vh - 210px)',
	}

	return (
		<Wrapper>
			<form
				style={style}
				onSubmit={handleSubmit}
				className='flex items-center justify-center   '
			>
				<div className='w-96'>
					<div className='mb-4'>
						<label htmlFor='name' className='block text-sm font-medium text-white'>
							Project Name:
						</label>
						<input
							required
							type='text'
							id='name'
							name='name'
							value={project.name}
							onChange={handleInputChange}
							className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 text-gray-900 bg-white border border-gray-300  text-sm'
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='description' className='block text-sm font-medium text-white'>
							Project Description:
						</label>
						<textarea
							required
							id='description'
							name='description'
							value={project.description}
							onChange={handleInputChange}
							className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 text-gray-900 bg-white border border-gray-300  text-sm'
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='image' className='block text-sm font-medium text-white'>
							Image URL:
						</label>
						<input
							required
							type='text'
							id='image'
							name='image'
							value={project.image}
							onChange={handleInputChange}
							className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 text-gray-900 bg-white border border-gray-300  text-sm'
						/>
					</div>

					<button
						type='submit'
						className=' transition-colors mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Add Project
					</button>
					<button
						type='button'
						onClick={handleGoBack}
						className=' transition-colors mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium  text-white bg-lime-600 hover:bg-lime-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Back to dashboard{' '}
					</button>
				</div>
			</form>
		</Wrapper>
	)
}

export default AddProject
