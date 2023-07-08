import React from 'react'
import Wrapper from '../helpers/Wrapper'
import { FaCircle } from 'react-icons/fa'

const About: React.FC = () => {
	return (
		<section className='text-center mt-20 font-Montserrat px-6 lg:w-4/5 mx-auto'>
			<h2 className='text-4xl font-bold text-indigo-50'>
				<span className='relative'>
					About
					<span className='absolute -z-10 left-0 right-0 w-4/5 h-2 bottom-1 bg-lime-400 opacity-60'></span>
				</span>
			</h2>
			<div className='lg:grid lg:grid-cols-2 gap-4'>
				<div>
					<h2 className='text-lg lg:text-2xl font-bold flex items-center justify-center mt-16 text-indigo-50'>
						<FaCircle size={8} className='text-lime-500 mr-1.5 hidden xl:block' />
						Collaborative Project Creation
					</h2>

					<p className='mt-4 text-zinc-300'>
						Our application revolutionizes the way teams work by enabling collaborative
						project creation. With our intuitive interface, you can easily initiate
						projects and invite team members to join. Experience seamless collaboration as
						you brainstorm ideas, assign tasks, and work together to achieve project
						goals. Our platform fosters unity, streamlines project management, and
						enhances teamwork.
					</p>
				</div>
				<div>
					<h2 className='text-lg lg:text-2xl font-bold flex items-center justify-center mt-16 text-indigo-50'>
						<FaCircle size={8} className='text-lime-500 mr-1.5 hidden xl:block' />
						Efficient Information Sharing{' '}
					</h2>

					<p className='mt-4 text-zinc-300'>
						Communication is key to success, and our app empowers you to share information
						effortlessly. Exchange ideas, updates, and files with your project team
						members through our secure and intuitive platform. Stay in sync and ensure
						everyone has access to the latest information, eliminating the need for
						scattered communication channels. Our app facilitates seamless collaboration,
						fostering efficient teamwork and ensuring everyone is on the same page.
					</p>
				</div>
				<div>
					<h2 className='text-lg lg:text-2xl font-bold flex items-center justify-center mt-16 text-indigo-50'>
						<FaCircle size={8} className='text-lime-500 mr-1.5 hidden xl:block' />
						Precise Time Tracking{' '}
					</h2>

					<p className='mt-4 text-zinc-300'>
						Time management is crucial, and our app provides an integrated time tracking
						feature. Keep track of the time you and your team spend on projects, tasks,
						and milestones. Gain valuable insights into project progress, identify areas
						for improvement, and ensure optimal resource allocation. Our precise time
						tracking functionality helps you manage your workload effectively, enhance
						productivity, and meet project deadlines with ease.
					</p>
				</div>
				<div>
					<h2 className='text-lg lg:text-2xl font-bold flex items-center justify-center mt-16 text-indigo-50'>
						<FaCircle size={8} className='text-lime-500 mr-1.5 hidden xl:block' />
						Free Accounts with Premium Features{' '}
					</h2>

					<p className='mt-4 text-zinc-300'>
						We believe in providing equal opportunities, which is why our app offers free
						accounts with a wide range of features. Enjoy access to essential project
						management tools, communication channels, and collaboration features without
						any cost. For those seeking additional functionality, we offer premium
						accounts with exclusive features and enhanced capabilities. Upgrade to a
						premium account to unlock advanced features and take your project management
						experience to the next level.
					</p>
				</div>

				<div>
					<h2 className='text-lg lg:text-2xl font-bold flex items-center justify-center mt-16 text-indigo-50'>
						<FaCircle size={8} className='text-lime-500 mr-1.5 hidden xl:block' />
						Browse and Explore Projects
					</h2>

					<p className='mt-4 text-zinc-300'>
						Our app provides a vibrant community of creators and innovators. Browse and
						explore a diverse range of projects from various domains, spanning industries
						and interests. Discover inspiring projects, learn from others' experiences,
						and gather insights to fuel your own creativity. Engage with project creators,
						share feedback, and connect with like-minded individuals to expand your
						network and enhance your professional growth.
					</p>
				</div>

				<div>
					<h2 className='text-lg lg:text-2xl font-bold flex items-center justify-center mt-16 text-indigo-50'>
						<FaCircle size={8} className='text-lime-500 mr-1.5 hidden xl:block' />
						<span> Personalized Profile and Dashboard</span>
					</h2>

					<p className='mt-4 text-zinc-300'>
						Every user gets a personalized profile and dashboard to manage their projects
						effectively. Customize your profile, highlight your skills and achievements,
						and showcase your portfolio. Access your dashboard to track your project
						participation, monitor progress, and stay organized. The dashboard provides a
						comprehensive overview of your projects, tasks, deadlines, and collaboration
						activities, ensuring you have complete control over your project management
						journey.
					</p>
				</div>
				<div>
					<h2 className='text-lg lg:text-2xl font-bold flex items-center justify-center mt-16 text-indigo-50 '>
						<FaCircle size={8} className='text-lime-500 mr-1.5 hidden xl:block' />
						Track Your Project Contributions
					</h2>

					<p className='mt-4 text-zinc-300'>
						With our app, you can easily track your project contributions. Monitor the
						projects you're actively involved in, view your assigned tasks, and track your
						progress. Whether you're a team leader or a valuable team member, our platform
						ensures transparency and accountability. Visualize your impact, measure your
						productivity, and showcase your achievements as you collaborate and make a
						difference within your projects.
					</p>
				</div>
				<div>
					<h2 className='text-lg lg:text-2xl font-bold flex items-center justify-center mt-16 text-indigo-50'>
						<FaCircle size={8} className='text-lime-500 mr-1.5 hidden xl:block' />
						Precise Time Tracking{' '}
					</h2>

					<p className='mt-4 text-zinc-300'>
						Time management is crucial, and our app provides an integrated time tracking
						feature. Keep track of the time you and your team spend on projects, tasks,
						and milestones. Gain valuable insights into project progress, identify areas
						for improvement, and ensure optimal resource allocation. Our precise time
						tracking functionality helps you manage your workload effectively, enhance
						productivity, and meet project deadlines with ease.
					</p>
				</div>
			</div>
		</section>
	)
}

export default About
