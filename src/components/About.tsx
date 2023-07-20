import React from 'react'
import { AiFillProject, AiOutlineShareAlt, AiOutlineClockCircle, AiFillStar, AiOutlineFolderOpen, AiOutlineUser, AiOutlineBulb } from 'react-icons/ai'

const About: React.FC = () => {
  return (
    <section className='text-center mt-20 font-Montserrat px-6 lg:w-4/5 mx-auto'>
      <h2 className='text-4xl font-bold text-zinc-50'>
        <span className='relative'>
          About
          <span className='absolute -z-10 left-0 right-0 w-4/5 h-2 bottom-1 bg-lime-400 opacity-60'></span>
        </span>
      </h2>
      <div className='lg:grid lg:grid-cols-2 gap-4'>
        <div>
          <h4 className='text-lg lg:text-2xl font-bold mt-16 text-zinc-50'>
            Collaborative Project Creation
          </h4>
          <div className="flex items-center justify-center mt-2">
            <AiFillProject size={36} className='text-lime-500 mb-4 my-2 w-full' />
          </div>
          <p className=' text-zinc-300'>
            Our application revolutionizes the way teams work by enabling collaborative
            project creation. With our intuitive interface, you can easily initiate
            projects and invite team members to join. Experience seamless collaboration as
            you brainstorm ideas, assign tasks, and work together to achieve project
            goals. Our platform fosters unity, streamlines project management, and
            enhances teamwork.
          </p>
        </div>
        <div>
          <h4 className='text-lg lg:text-2xl font-bold mt-16 text-zinc-50'>
            Efficient Information Sharing{' '}
          </h4>
          <div className="flex items-center justify-center mt-2">
            <AiOutlineShareAlt size={36} className='text-lime-500 mb-4 my-2 w-full' />
          </div>
          <p className=' text-zinc-300'>
            Communication is key to success, and our app empowers you to share information
            effortlessly. Exchange ideas, updates, and files with your project team
            members through our secure and intuitive platform. Stay in sync and ensure
            everyone has access to the latest information, eliminating the need for
            scattered communication channels. Our app facilitates seamless collaboration,
            fostering efficient teamwork and ensuring everyone is on the same page.
          </p>
        </div>
        <div>
          <h4 className='text-lg lg:text-2xl font-bold mt-16 text-zinc-50'>
            Precise Time Tracking{' '}
          </h4>
          <div className="flex items-center justify-center mt-2">
            <AiOutlineClockCircle size={36} className='text-lime-500 mb-4 my-2 w-full' />
          </div>
          <p className=' text-zinc-300'>
            Time management is crucial, and our app provides an integrated time tracking
            feature. Keep track of the time you and your team spend on projects, tasks,
            and milestones. Gain valuable insights into project progress, identify areas
            for improvement, and ensure optimal resource allocation. Our precise time
            tracking functionality helps you manage your workload effectively, enhance
            productivity, and meet project deadlines with ease.
          </p>
        </div>
        <div>
          <h4 className='text-lg lg:text-2xl font-bold mt-16 text-zinc-50'>
            Free Accounts with Premium Features{' '}
          </h4>
          <div className="flex items-center justify-center mt-2">
            <AiFillStar size={36} className='text-lime-500 mb-4 my-2 w-full' />
          </div>
          <p className=' text-zinc-300'>
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
          <h4 className='text-lg lg:text-2xl font-bold mt-16 text-zinc-50'>
            Browse and Explore Projects
          </h4>
          <div className="flex items-center justify-center mt-2">
            <AiOutlineFolderOpen size={36} className='text-lime-500 mb-4 my-2 w-full' />
          </div>
          <p className=' text-zinc-300'>
            Our app provides a vibrant community of creators and innovators. Browse and
            explore a diverse range of projects from various domains, spanning industries
            and interests. Discover inspiring projects, learn from others' experiences,
            and gather insights to fuel your own creativity. Engage with project creators,
            share feedback, and connect with like-minded individuals to expand your
            network and enhance your professional growth.
          </p>
        </div>

        <div>
          <h4 className='text-lg lg:text-2xl font-bold mt-16 text-zinc-50'>
            Personalized Profile and Dashboard
          </h4>
          <div className="flex items-center justify-center mt-2">
            <AiOutlineUser size={36} className='text-lime-500 mb-4 my-2 w-full' />
          </div>
          <p className=' text-zinc-300'>
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
          <h4 className='text-lg lg:text-2xl font-bold mt-16 text-zinc-50'>
            Track Your Project Contributions
          </h4>
          <div className="flex items-center justify-center mt-2">
            <AiOutlineBulb size={36} className='text-lime-500 mb-4 my-2 w-full' />
          </div>
          <p className=' text-zinc-300'>
            With our app, you can easily track your project contributions. Monitor the
            projects you're actively involved in, view your assigned tasks, and track your
            progress. Whether you're a team leader or a valuable team member, our platform
            ensures transparency and accountability. Visualize your impact, measure your
            productivity, and showcase your achievements as you collaborate and make a
            difference within your projects.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
