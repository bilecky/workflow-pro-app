import React from 'react'
import Wrapper from '../../helpers/Wrapper'
import { Tb3DCubeSphere } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
	return (
		<Wrapper>
			<footer className='border-t border-lime-500 py-4 lg:w-4/5 mt-20  m-auto'>
				<div className='text-center xl:text-lg'>
					<div className='flex  justify-center'>
						<Link to='/' className='flex items-center text-white'>
							<Tb3DCubeSphere className='w-6 h-6' />
							<h2 className='text-2xl font-bolder ml-3 text-lime-400 '>Workflow Pro</h2>
						</Link>
					</div>
					<p className='text-white my-1'>Designed & developed by</p>
					<p className='font-bold text-lime-100 tracking-wider '>
						<a href='https://github.com/bilecky'>Paweł Bilski</a>
					</p>
				</div>
			</footer>
		</Wrapper>
	)
}

export default Footer
