import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { auth, database } from '../../firebase/firebaseConfig'
import { Project } from '../../redux/projectSlice'
import { useNavigate } from 'react-router-dom'
import { Participant } from '../../redux/projectSlice'
import Comments from './Comments'

type ProjectParams = {
	id: string
}

const ProjectDetails: React.FC = () => {
	const currentUser = auth.currentUser
	const navigate = useNavigate()

	useEffect(() => {
		if (!currentUser) {
			navigate('/')
		}
	}, [navigate, currentUser])

	const { id } = useParams<ProjectParams>()

	const [project, setProject] = useState<Project | null>(null)
	const [isRunning, setIsRunning] = useState<boolean>(false)
	const [timeElapsed, setTimeElapsed] = useState<number>(0)
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
	const [joining, setIsJoining] = useState<boolean>(false)

	useEffect(() => {
		const fetchProject = async () => {
			try {
				if (id) {
					const projectsCollectionRef = collection(database, 'projects')
					const projectQuery = query(projectsCollectionRef, where('id', '==', id))
					const querySnapshot = await getDocs(projectQuery)

					if (!querySnapshot.empty) {
						const projectData = querySnapshot.docs[0].data() as Project
						setProject(projectData)
						setTimeElapsed(getUserTimeElapsed(projectData, currentUser?.email ?? ''))
					} else {
						console.error('Project with the provided ID does not exist')
					}
				}
			} catch (error) {
				console.error('Error fetching project:', error)
			}
		}

		fetchProject()
	}, [id, currentUser, joining])

	const getUserTimeElapsed = (project: Project, email: string | undefined): number => {
		if (!email || !project || !project.participants) {
			return 0
		}

		const participant = project.participants.find(p => p.email === email)
		if (!participant || !participant.timeSpend) {
			return 0
		}

		return participant.timeSpend
	}

	const handleStart = () => {
		if (!isRunning) {
			setIsRunning(true)
			setTimer(
				setInterval(() => {
					setTimeElapsed(prevTimeElapsed => prevTimeElapsed + 1)
				}, 1000)
			)
		}
	}

	const handleStop = async () => {
		setIsRunning(false)

		if (timer) {
			clearInterval(timer)
			setTimer(null)
		}

		const currentUser = auth.currentUser
		if (currentUser && project) {
			const projectsCollectionRef = collection(database, 'projects')
			const projectQuery = query(projectsCollectionRef, where('id', '==', id))
			const querySnapshot = await getDocs(projectQuery)
			if (!querySnapshot.empty) {
				const docRef = querySnapshot.docs[0].ref

				const updatedParticipants: Participant[] = querySnapshot.docs[0]
					.data()
					.participants.map((participant: Participant) => {
						if (participant.email === currentUser.email) {
							return {
								email: participant.email,
								timeSpend: timeElapsed,
							}
						}
						return participant
					})

				await updateDoc(docRef, {
					participants: updatedParticipants,
				})
			}
		}

		window.onbeforeunload = null
	}

	const handleJoinProject = async () => {
		if (!joining && currentUser && project) {
			setIsJoining(true)

			try {
				const projectsCollectionRef = collection(database, 'projects')
				const projectQuery = query(projectsCollectionRef, where('id', '==', id))
				const querySnapshot = await getDocs(projectQuery)

				if (!querySnapshot.empty) {
					const projectDocRef = querySnapshot.docs[0].ref
					const projectData = querySnapshot.docs[0].data() as Project

					if (projectData.authorId === currentUser.uid) {
						console.log('Jesteś już twórcą tego projektu.')
						return
					}

					let participants: Participant[] = []

					if (projectData.participants) {
						participants = [...projectData.participants]
					}

					const currentUserParticipant = participants.find(
						participant => participant.email === currentUser.email!
					)

					if (!currentUserParticipant) {
						participants.push({ email: currentUser.email, timeSpend: 0 })
					}

					await updateDoc(projectDocRef, {
						participants: participants,
					})

					console.log('Użytkownik dołączył do projektu')

					// Wyświetlanie powiadomienia i opóźnienie pojawienia się przycisków Start/Stop
				} else {
					console.error('Projekt o podanym ID nie istnieje')
				}
			} catch (error) {
				console.error('Błąd podczas dołączania do projektu:', error)
			}

			setIsJoining(false)
		}
	}
	if (!project) {
		return <div>Loading...</div>
	}

	const formatTime = (timeInSeconds: number): string => {
		const hours = Math.floor(timeInSeconds / 3600)
		const minutes = Math.floor((timeInSeconds % 3600) / 60)
		const seconds = timeInSeconds % 60

		const formattedHours = hours.toString().padStart(2, '0')
		const formattedMinutes = minutes.toString().padStart(2, '0')
		const formattedSeconds = seconds.toString().padStart(2, '0')

		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
	}

	const userEmail = currentUser?.email
	console.log(userEmail)

	const isParticipant =
		currentUser &&
		project.participants &&
		project.participants.find(participant => participant.email === userEmail)

	const isAuthor = currentUser && project.authorId === currentUser.uid

	return (
		<div>
			<h2 className='text-2xl font-bold mb-4'>{project.name}</h2>
			<p>{project.description}</p>
			<p>Czas spędzony nad projektem: {formatTime(timeElapsed)}</p>
			{isAuthor || isParticipant ? (
				<>
					{!isRunning ? (
						<button
							onClick={handleStart}
							className='px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700'
						>
							Start
						</button>
					) : (
						<button
							onClick={handleStop}
							className='px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700'
						>
							Stop
						</button>
					)}
				</>
			) : (
				<>
					{!isParticipant ? (
						<button
							onClick={handleJoinProject}
							className='px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700'
						>
							Dołącz do projektu
						</button>
					) : null}
				</>
			)}
			<Comments/>
		</div>
	)
}

export default ProjectDetails
