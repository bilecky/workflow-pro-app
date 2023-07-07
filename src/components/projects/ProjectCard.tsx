import React from 'react';
import { Project } from '../../redux/projectSlice';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const {  name, date, description, participants, img } = project;

  return (
    <div className="   shadow-lime-500 shadow-sm p-4  hover:scale-95 hover:shadow-md transition-all">
      <img className="w-full h-48 object-cover transform hover:scale-105 transition-all" src={img} alt={name} />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">{date}</p>
        <p className="text-gray-800 mt-2">{description}</p>
        <p className="text-gray-600 mt-2">Participants: {participants}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
