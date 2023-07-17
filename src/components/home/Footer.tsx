import React from 'react'
import Wrapper from '../../helpers/Wrapper'

const Footer = () => {
	return (
		<Wrapper>
			<footer className='border-t border-lime-500 py-4 lg:w-4/5 mt-10  m-auto'>
			
				<div className='text-center xl:text-lg'>
					<p className='text-white'>Designed & developed by</p>
					<p className='font-bold text-lime-100 tracking-wide '>
                  <a href="https://github.com/bilecky">Paweł Bilski</a>
                  </p>
				</div>
			</footer>
		</Wrapper>
	)
}

export default Footer
