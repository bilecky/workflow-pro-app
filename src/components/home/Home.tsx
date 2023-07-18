import React, { useState, useEffect, useRef } from 'react'
import { AiOutlineUser, AiOutlineProject, AiOutlineLike } from 'react-icons/ai'
import Wrapper from '../../helpers/Wrapper'
import PopularProjects from '../projects/PopularProjects'
import NewProjects from '../projects/NewProjects'
import Presentation from './Presentation'

const Home: React.FC = () => {
	const [userCount, setUserCount] = useState<number>(0)
	const [projectCount, setProjectCount] = useState<number>(0)
	const [likeCount, setLikeCount] = useState<number>(0)
	const [elementCount, setElementCount] = useState<number>(0)
	const sectionRef = useRef<HTMLDivElement>(null)
	const [hasAnimated, setHasAnimated] = useState<boolean>(false)
	console.log(hasAnimated)
	const animateCount = (
		targetCount: number,
		setCount: React.Dispatch<React.SetStateAction<number>>
	) => {
		const increment: number = Math.ceil(targetCount / 100)

		let currentCount: number = 0

		const timer = setInterval(() => {
			currentCount += increment
			setCount(currentCount)
			if (currentCount >= targetCount) {
				clearInterval(timer)
			}
		}, 50)
	}

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting && entry.intersectionRatio >= 0.1 && !hasAnimated) {
						animateCount(7, setUserCount)
						animateCount(7, setProjectCount)
						animateCount(12, setLikeCount)
						animateCount(15, setElementCount)
						setHasAnimated(true)
						if (sectionRef.current) {
							observer.unobserve(sectionRef.current)
						}
					}
				})
			},
			{ threshold: 0.1 }
		)

		if (sectionRef.current) {
			observer.observe(sectionRef.current)
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current)
			}
		}
	}, [])

	return (
		<main>
			<Wrapper>
				<Presentation />
				<section className='text-center mt-20 font-Montserrat'>
					<h2 className='text-4xl font-bold text-indigo-50 tracking-wide  lg:text-5xl'>
						<span className='relative '>
							Weekly stats
							<span className='absolute -z-10 left-0 right-0 w-4/5 h-2 bottom-1 bg-lime-400 opacity-60 '></span>
						</span>
					</h2>
					<div className='flex mt-16 space-x-8 lg:w-4/5 m-auto'>
						<div className='flex-1'>
							<div className='border-b-4 border-lime-400   p-4 min-h-full'>
								<div className='flex items-center justify-center '>
									<AiOutlineUser className='text-4xl text-lime-400' />
								</div>
								<p className='text-4xl font-bold  text-indigo-50 my-2'>{userCount}</p>
								<p className='text-indigo-50'>New Users</p>
							</div>
						</div>
						<div className='flex-1 sm:w-1/2 lg:w-1/4'>
							<div className='border-b-4 border-lime-400   p-4 min-h-full'>
								<div className='flex items-center justify-center '>
									<AiOutlineProject className='text-4xl text-lime-400 ' />
								</div>
								<p className='text-4xl font-bold text-indigo-50 my-2'>{projectCount}</p>
								<p className='text-indigo-50'>New Projects</p>
							</div>
						</div>
						<div className='flex-1 sm:w-1/2 lg:w-1/4'>
							<div className='border-b-4 border-lime-400   p-4 min-h-full'>
								<div className='flex items-center justify-center '>
									<AiOutlineLike className='text-4xl text-lime-400' />
								</div>
								<p className='text-4xl font-bold text-indigo-50 my-2'>{likeCount}</p>
								<p className='text-indigo-50'>New Likes</p>
							</div>
						</div>
						<div className='flex-1 sm:w-1/2 lg:w-1/4 hidden sm:block'>
							<div className='border-b-4 border-lime-400   p-4 min-h-full'>
								<div className='flex items-center justify-center '>
									<AiOutlineLike className='text-4xl text-lime-400' />
								</div>
								<p className='text-4xl font-bold text-indigo-50 my-2'>{elementCount}</p>
								<p className='text-indigo-50'>New Element</p>
							</div>
						</div>
					</div>
				</section>

				<div ref={sectionRef}></div>
				<PopularProjects />

				<NewProjects />
			</Wrapper>
		</main>
	)
}

export default Home
