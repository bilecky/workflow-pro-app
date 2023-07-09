import React from 'react'

const BackgroundShape = () => {
	return (
		<div className='absolute top-0 left-0 h-full w-full overflow-hidden -z-20 opacity-40 lg:opacity-20'>
			<img
				src='/src/assets/png-image.png'
				alt='background shape'
				className='w-full h-full -z-10'
			/>
			<div
				className='absolute inset-0'
				style={{
					background: 'linear-gradient(to top, rgba(63, 63, 70, 1), rgba(63, 63, 70, 0))',
				}}
			/>
		</div>
	)
}

export default BackgroundShape
