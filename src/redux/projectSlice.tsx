import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { database } from '../firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

export interface Project {
	id: string
	name: string
	date: string
	description: string
	participants: number
	img: string
}

interface ProjectsState {
	data: Project[]
	isLoading: boolean
	error: string | null
}

const initialState: ProjectsState = {
	data: [],
	isLoading: false,
	error: null,
}

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
	try {
		const collectionRef = collection(database, 'projects')
		const querySnapshot = await getDocs(collectionRef)

		const projectData: Project[] = []
		querySnapshot.forEach(doc => {
			const project = doc.data() as Project
			projectData.push(project)
		})

		return projectData
	} catch (err) {
		throw new Error('ERROR WHILE DOWNLOADING PROJECTS')
	}
})

const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchProjects.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchProjects.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null
				state.data = action.payload  as Project[]
			})
			.addCase(fetchProjects.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message ?? 'Błąd podczas pobierania projektów.'
			})
	},
})

export default projectsSlice.reducer
