import React, { useState, useEffect } from 'react'
import { AiOutlineUser, AiOutlineProject, AiOutlineLike } from 'react-icons/ai'
import Wrapper from '../../wrapper'
import PopularProjects from '../projects/PopularProjects'

const Home: React.FC = () => {
	const [userCount, setUserCount] = useState<number>(0)
	const [projectCount, setProjectCount] = useState<number>(0)
	const [likeCount, setLikeCount] = useState<number>(0)
	const [elementCount, setElementCount] = useState<number>(0)

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
   useEffect(() => 
   
   {
   setTimeout(() => {
      animateCount(7, setUserCount);
      animateCount(7, setProjectCount);
      animateCount(12, setLikeCount);
      animateCount(15, setElementCount);
   }, 800)


   }, [])
   

	return (
		<main>
			<Wrapper>
         <section className='text-center mt-20'>
          <h2 className='text-4xl font-bold'>
            <span className='relative'>
              Weekly stats
              <span className='absolute -z-10 left-0 right-0 w-4/5 h-2 bottom-1 bg-green-500 opacity-50'></span>
            </span>
          </h2>
          <div className='flex mt-16 space-x-8 lg:w-4/5 m-auto'>
            <div className='flex-1'>
              <div className='border-b-4 border-gray-300 rounded-lg p-4 min-h-full'>
                <div className='flex items-center justify-center '>
                  <AiOutlineUser className='text-4xl' />
                </div>
                <p className='text-4xl font-bold  my-2'>{userCount}</p>
                <p className='text-gray-600'>New Users</p>
              </div>
            </div>
            <div className='flex-1 sm:w-1/2 lg:w-1/4'>
              <div className='border-b-4 border-gray-300 rounded-lg p-4 min-h-full'>
                <div className='flex items-center justify-center '>
                  <AiOutlineProject className='text-4xl' />
                </div>
                <p className='text-4xl font-bold my-2'>{projectCount}</p>
                <p className='text-gray-600'>New Projects</p>
              </div>
            </div>
            <div className='flex-1 sm:w-1/2 lg:w-1/4'>
              <div className='border-b-4 border-gray-300 rounded-lg p-4 min-h-full'>
                <div className='flex items-center justify-center '>
                  <AiOutlineLike className='text-4xl' />
                </div>
                <p className='text-4xl font-bold my-2'>{likeCount}</p>
                <p className='text-gray-600'>New Likes</p>
              </div>
            </div>
            <div className='flex-1 sm:w-1/2 lg:w-1/4 hidden sm:block'>
              <div className='border-b-4 border-gray-300 rounded-lg p-4 min-h-full'>
                <div className='flex items-center justify-center '>
                  <AiOutlineLike className='text-4xl' />
                </div>
                <p className='text-4xl font-bold my-2'>{elementCount}</p>
                <p className='text-gray-600'>New Element</p>
              </div>
            </div>
          </div>
        </section>
				<PopularProjects />
			</Wrapper>
		</main>
	)
}

export default Home
