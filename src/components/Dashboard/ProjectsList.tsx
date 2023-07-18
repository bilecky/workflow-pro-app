import React, { useEffect, useState } from 'react'
import { auth, database } from '../../firebase/firebaseConfig'

import { collection, query, where, getDocs, QuerySnapshot } from 'firebase/firestore'
import { Project } from '../../redux/projectSlice'
import { Link } from 'react-router-dom'

const ProjectList: React.FC = () => {
	const [projects, setProjects] = useState<Project[]>([])

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				auth.onAuthStateChanged(async user => {
					if (user) {
						const projectsQuery = query(
							collection(database, 'projects'),
							where('authorId', '==', user.uid)
						)
						const querySnapshot: QuerySnapshot = await getDocs(projectsQuery)

						const projectsData: Project[] = []
						querySnapshot.forEach(doc => {
							const project = doc.data() as Project
							projectsData.push(project)
						})

						setProjects(projectsData)
					} else {
						console.error('Użytkownik nie jest zalogowany')
					}
				})
			} catch (error) {
				console.error('Wystąpił błąd podczas pobierania projektów:', error)
			}
		}

		fetchProjects()
	}, [])


	return (
		<div className=' overflow-x-auto w-full lg:h-[850px] h-[350px]'>
			<h2 className='text-xl text-white mb-4'>Your Projects ({projects.length}):</h2>

			{projects.length <= 0 ? (
				<p className='text-indigo-200'>You don't have any projects, add some!</p>
			) : (
				<ul className='flex flex-col sm:h-auto sm:overflow-y-visible'>
					{projects.map(project => (
						<li
							id={project.id}
							key={project.id}
							className='p-4 mb-4 bg-gray-200 hover:bg-lime-300  transition-colors    hover:shadow-lg'
						>
							<Link to={`/projects/${project.id}`}>
								<h3 className='text-xl font-semibold'>{project.name}</h3>
								<p>{project.description}</p>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default ProjectList
