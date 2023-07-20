import React, { useState, useEffect, useRef } from 'react'
import { AiOutlineUser, AiOutlineProject, AiOutlineLike } from 'react-icons/ai'
import Wrapper from '../../helpers/Wrapper'
import PopularProjects from '../projects/PopularProjects'
import NewProjects from '../projects/NewProjects'
import Presentation from './Presentation'
import Statistics from '../Dashboard/Statistics'

const Home: React.FC = () => {
	const [userCount, setUserCount] = useState<number>(0)
	const [projectCount, setProjectCount] = useState<number>(0)
	const [likeCount, setLikeCount] = useState<number>(0)
	const [elementCount, setElementCount] = useState<number>(0)
	const sectionRef = useRef<HTMLDivElement>(null)
	const [hasAnimated, setHasAnimated] = useState<boolean>(false)
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
			<Statistics/>
				<PopularProjects />

				<NewProjects />
			</Wrapper>
		</main>
	)
}

export default Home
