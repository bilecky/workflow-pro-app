import React, { useEffect, useState } from 'react';
import { auth, database } from '../../firebase/firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  QuerySnapshot,
} from 'firebase/firestore';
import { Project } from '../../redux/projectSlice';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const projectsQuery = query(
              collection(database, 'projects'),
              where('authorId', '==', user.uid)
            );
            const querySnapshot: QuerySnapshot = await getDocs(projectsQuery);

            const projectsData: Project[] = [];
            querySnapshot.forEach((doc) => {
              const project = doc.data() as Project;
              projectsData.push(project);
            });

            setProjects(projectsData);
          } else {
            return;
          }
        });
      } catch (error) {
        return;
      }
    };

    fetchProjects();
  }, []);

  const handleDeleteProject = async (projectId: string) => {


    const projectsCollectionRef = collection(database, 'projects');
    const projectQuery = query(projectsCollectionRef, where('id', '==', projectId));
    const querySnapshot = await getDocs(projectQuery);

    try {
      const projectDocRef = doc(database, 'projects', querySnapshot.docs[0].id);

      await deleteDoc(projectDocRef);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } catch (error) {
      console.error('Error deleting project: ', error);
    }
  };

  return (
    <>
      <h2 className="text-xl text-white mb-4">Your Projects ({projects.length}):</h2>

      <div className=" overflow-x-auto w-full lg:h-[850px] h-[350px]">
        {projects.length <= 0 ? (
          <p className="text-indigo-200">You don't have any projects, add some!</p>
        ) : (
          <ul className="flex flex-col sm:h-auto sm:overflow-y-visible">
            {projects.map((project) => (
              <li
                id={project.id}
                key={project.id}
                className="p-4 mb-4 bg-gray-200 hover:bg-lime-300  transition-colors    hover:shadow-lg relative"
              >
                <Link to={`/projects/${project.id}`}>
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p className="line-clamp-1">{project.description}</p>
                </Link>
					 <button
                  className="absolute top-4 right-4 text-red-300 hover:text-red-800"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ProjectList;
