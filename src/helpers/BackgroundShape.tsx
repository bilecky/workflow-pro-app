import React from 'react'

const BackgroundShape = () => {
	return (
		<div className='absolute top-0 left-0 h-full w-full overflow-hidden -z-20 opacity-30'>
			<img
				src='/src/assets/png-image.png'
				alt='background shape'
				className='w-full'
				style={{ zIndex: -1 }}
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
