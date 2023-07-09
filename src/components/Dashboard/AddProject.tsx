import React, { useState,useEffect } from 'react'
import { Project } from '../../redux/projectSlice'
import { auth, database } from '../../firebase/firebaseConfig'
import { addDoc, collection } from 'firebase/firestore'

const AddProject: React.FC = () => {
	const [project, setProject] = useState<Project>({
		id: '',
		name: '',
		description: '',
		image: '',
		participants: [],
		authorId: '',
		date: '',
	})

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target

		setProject(prevProject => ({
			...prevProject,
			[name]: value,
		}))
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()

		try {
			const projectsCollection = collection(database, 'projects')
			const user = auth.currentUser

			if (user) {
            const date = new Date();
            const idFromDate = date.toISOString().slice(0, -5);

				const currentDate = date.toISOString().split('T')[0]
				const newProject = {
					...project,
               id: idFromDate,
					authorId: user.uid,
					participants: [...project.participants, user.email], // Dodaj ID użytkownika do tablicy participants
					date: currentDate,
				}
				await addDoc(projectsCollection, newProject)
				console.log('Projekt został pomyślnie dodany do Firestore')
			}
		} catch (error) {
			console.log(error + 'mamy blad podczas dodawania')
		}
	}

   useEffect(() => {}, [])

	return (
		<form onSubmit={handleSubmit} className='flex items-center justify-center h-screen'>
			<div className='w-96'>
				<div className='mb-4'>
					<label htmlFor='name' className='block text-sm font-medium text-white'>
						Project Name:
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={project.name}
						onChange={handleInputChange}
						className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-md text-sm'
					/>
				</div>
				<div className='mb-4'>
					<label htmlFor='description' className='block text-sm font-medium text-white'>
						Project Description:
					</label>
					<textarea
						id='description'
						name='description'
						value={project.description}
						onChange={handleInputChange}
						className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-md text-sm'
					/>
				</div>
				<div className='mb-4'>
					<label htmlFor='image' className='block text-sm font-medium text-white'>
						Image URL:
					</label>
					<input
						type='text'
						id='image'
						name='image'
						value={project.image}
						onChange={handleInputChange}
						className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-md text-sm'
					/>
				</div>
			
				<button
					type='submit'
					className='w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
				>
					Add Project
				</button>
			</div>
		</form>
	)
}

export default AddProject
