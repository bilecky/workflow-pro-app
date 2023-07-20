import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { auth } from '../../firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'
import { RootState } from '../../redux/store'

const Register: React.FC = () => {
	const user = useSelector((state: RootState) => state.auth.value)

	const navigate = useNavigate()

	const [email, setEmail] = useState<string>('')

	const [password, setPassword] = useState<string>('')
	const [registerErr, setRegisterErr] = useState<boolean>()


	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(e.target.value)
	}

	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setPassword(e.target.value)
	}
	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [navigate, user])
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()

		
		try {
			await createUserWithEmailAndPassword(auth, email, password)

		} catch (error) {
			setRegisterErr(true)
			const timer = setTimeout(() => {
				setRegisterErr(false)
			}, 3000)
			return () => {
				clearTimeout(timer)
			}
		}
	}



	return (
		<div className='flex items-center justify-center h-[80vh] '>
			<form onSubmit={handleSubmit} className='bg-white shadow-md p-12'>
				<h3 className='text-xl font-bold mb-4'>Sign Up</h3>
				<div className='mb-4'>
					<label htmlFor='email' className=' block mb-2'>
						Email:
					</label>
					<input
						className='w-full border border-gray-300 p-2'
						type='email'
						id='email'
						value={email}
						onChange={handleEmail}
					/>
				</div>
				<div className='mb-4'>
					<label htmlFor='password' className=' block mb-2'>
						Password:
					</label>
					<input
						className='w-full border border-gray-300 p-2'
						type='password'
						id='password'
						value={password}
						onChange={handlePassword}
					/>
				</div>
				<button className='bg-lime-400 py-3 px-5 my-2 transition hover:bg-lime-500 hover:text-white'>
					Register!
				</button>
				<div className='w-full overflow-hidden break-all'>
					{registerErr && (
						<p className='text-sm text-red-500'>Error! Check your email/password</p>
					)}
				</div>
			</form>
		</div>
	)
}

export default Register
