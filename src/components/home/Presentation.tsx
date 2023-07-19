import { useMediaQuery } from 'react-responsive'
import small from '../../assets/small.png'
import big from '../../assets/big.png'

const Presentation = () => {
	const isMobile = useMediaQuery({ maxWidth: 768 })

	const imageStyle = {
		width: '100%',
		filter: 'hue-rotate(-45deg) saturate(1) brightness(1.1)',
	}

	return (
		<section className='text-center mt-20 lg:w-4/5 m-auto'>
			<h2 className='text-4xl lg:text-5xl font-bold text-indigo-50 tracking-wide'>
				<span className='relative'>
					Unleash potential
					<span className='absolute -z-10 left-0 right-0 w-4/5 h-2 bottom-1 bg-lime-400 opacity-60'></span>
				</span>
			</h2>

			<div className=' mt-10 flex flex-col lg:flex-row  items-center justify-center'>
				{isMobile ? (
					<>
						<div className='mb-10'>
							<img
								src={small}
								alt='header presentation image'
								style={imageStyle}
								className='w-full '
							/>
						</div>
						<div className='text-indigo-50'>
							<p>
								Discover the power of <h1 className='text-lime-500 inline'>Workflow Pro</h1> in
								today's fast-paced world. Effortlessly track your work hours, collaborate
								seamlessly with your team, and add projects with ease. Stay organized,
								increase productivity, and create a free account to experience the
								efficiency firsthand. Supercharge your workflow with Workflow Pro today!
							</p>
							<p className='my-5'>
								Boost your productivity in the modern age with Workflow Pro. Effortlessly
								track your work time, collaborate with colleagues, and manage projects
								efficiently. With its intuitive interface and free account option,
								Workflow Pro is the ultimate tool to enhance your workflow and achieve
								success.
							</p>
							<p>
								Stay on top of your tasks and deadlines with Workflow Pro. Seamlessly
								track your work hours, collaborate with your team, and add comments for
								effective communication. Experience the convenience of a free account and
								unlock the full potential of your productivity. Take control of your work
								with Workflow Pro today!
							</p>
						</div>
					</>
				) : (
					<>
						<div className='md:w-1/2 mb-8 md:mb-0 text-indigo-50 lg:tracking-wide xl:tracking-wider xl:text-lg h-23'>
							<p>
								Discover the power of <span className='text-lime-400'>Workflow Pro</span>{' '}
								in today's fast-paced world. Effortlessly track your work hours,
								collaborate seamlessly with your team, and add projects with ease. Stay
								organized, increase productivity, and create a free account to experience
								the efficiency firsthand. Supercharge your workflow with Workflow Pro
								today!
							</p>
							<p className='my-5'>
								Boost your productivity in the modern age with Workflow Pro. Effortlessly
								track your work time, collaborate with colleagues, and manage projects
								efficiently. With its intuitive interface and free account option,
								Workflow Pro is the ultimate tool to enhance your workflow and achieve
								success.
							</p>
							<p>
								Stay on top of your tasks and deadlines with Workflow Pro. Seamlessly
								track your work hours, collaborate with your team, and add comments for
								effective communication. Experience the convenience of a free account and
								unlock the full potential of your productivity. Take control of your work
								with Workflow Pro today!
							</p>
						</div>
						<div className='md:w-1/2'>
							<img src={big} alt='header presentation image' style={imageStyle} />
						</div>
					</>
				)}
			</div>
		</section>
	)
}

export default Presentation
