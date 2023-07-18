import React, { useEffect, useState } from 'react'
import { auth, database } from '../../firebase/firebaseConfig'

import {
	collection,
	query,
	where,
	getDocs,
	QuerySnapshot,
	FieldPath,
} from 'firebase/firestore'
import { Project } from '../../redux/projectSlice'
import { Link } from 'react-router-dom'

const JoinedProjectsList: React.FC = () => {
	const [projects, setProjects] = useState<Project[]>([])

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				auth.onAuthStateChanged(async user => {
					if (user) {
            console.log(user.email)
						const projectsQuery = query(
							collection(database, 'projects'),
						)
						const querySnapshot: QuerySnapshot = await getDocs(projectsQuery)
						const projectsData: Project[] = []
						// querySnapshot.forEach(doc => {
						// 	const project = doc.data() as Project

						// 	projectsData.push(project)
						// })
            const documents = querySnapshot.docs.map((doc) => doc.data());
            const filteredProjects = documents.filter((project) =>
            project.participants.some((participant) => participant.email === user.email)
          );
          const filterWithoutAuthor = filteredProjects.filter(project => project.authorId !== user.uid)
          console.log(documents)


						setProjects(filterWithoutAuthor)
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
		<div className='h-30vh overflow-x-auto w-full'>
			<div className='flex flex-col'>
				{projects.length <= 0 ? (
					<p className='text-indigo-200'>
						You haven't joined any projects, create a new one or join!{' '}
					</p>
				) : (
					projects.map(project => (
						<Link
							id={project.id}
							key={project.id}
							to={`/projects/${project.id}`}
							className='p-4 mb-4 bg-gray-100 rounded-md shadow-md hover:shadow-lg'
						>
							<h3 className='text-xl font-semibold'>{project.name}</h3>
							<p>{project.description}</p>
						</Link>
					))
				)}
			</div>
		</div>
	)
}

export default JoinedProjectsList
