import React, { useEffect, useState } from 'react'
import { auth, database } from '../../firebase/firebaseConfig'

import { collection, query, where, getDocs, QuerySnapshot } from 'firebase/firestore';
import { Project } from '../../redux/projectSlice'
import { Link } from 'react-router-dom'

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
               console.error('Użytkownik nie jest zalogowany');
             }
   
           });
         } catch (error) {
           console.error('Wystąpił błąd podczas pobierania projektów:', error);
         }
       };
   
       fetchProjects();
   }, [projects]);
 
   return (
     <div className="h-30vh overflow-x-auto w-full">
       <h2 className="text-2xl font-bold mb-4">Lista Twoich projektów:</h2>
       <div className="flex flex-col">
         {projects.map((project) => (
           <Link
           id = {project.id}
             key={project.id}
             to={`/projects/${project.id}`}
             className="p-4 mb-4 bg-gray-100 rounded-md shadow-md hover:shadow-lg"
           >
             <h3 className="text-xl font-semibold">{project.name}</h3>
             <p>{project.description}</p>
           </Link>
         ))}
       </div>
     </div>
   );
 };
 
 export default ProjectList;