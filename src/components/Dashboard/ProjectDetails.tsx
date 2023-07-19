import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { auth, database } from '../../firebase/firebaseConfig';
import { Project } from '../../redux/projectSlice';
import { Participant } from '../../redux/projectSlice';
import Comments from './Comments';
import Wrapper from '../../helpers/Wrapper';
import { BsClock } from 'react-icons/bs';
import { AiOutlineProject, AiOutlineUser, AiOutlineArrowLeft } from 'react-icons/ai';

type ProjectParams = {
  id: string | undefined;
};

const ProjectDetails: React.FC = () => {
  const currentUser = auth.currentUser;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const { id = '' } = useParams<ProjectParams>();

  const [project, setProject] = useState<Project | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [joining, setIsJoining] = useState<boolean>(false);
  const [leaving, setIsLeaving] = useState<boolean>(false);

  const getProjectData = async (projectId: string) => {
    const projectsCollectionRef = collection(database, 'projects');
    const projectQuery = query(projectsCollectionRef, where('id', '==', projectId));
    const querySnapshot = await getDocs(projectQuery);

    return querySnapshot;
  };

  const fetchProject = useCallback(async () => {
    try {
      if (id) {
        const querySnapshot = await getProjectData(id);

        if (!querySnapshot.empty) {
          const projectData = querySnapshot.docs[0].data() as Project;
          setProject(projectData);
          setTimeElapsed(getUserTimeElapsed(projectData, currentUser?.email ?? ''));
        } else {
          console.error('Project with the provided ID does not exist');
        }
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  }, [id, currentUser]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const getUserTimeElapsed = (project: Project, email: string | undefined): number => {
    if (!email || !project || !project.participants) {
      return 0;
    }

    const participant = project.participants.find((p) => p.email === email);
    if (!participant || !participant.timeSpend) {
      return 0;
    }

    return participant.timeSpend;
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      setTimer(
        setInterval(() => {
          setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
        }, 1000)
      );
    }
  };

  const handleStop = async () => {
    setIsRunning(false);

    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }

    const currentUser = auth.currentUser;
    if (currentUser && project) {
      const querySnapshot = await getProjectData(id);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        const updatedParticipants: Participant[] = querySnapshot.docs[0]
          .data()
          .participants.map((participant: Participant) => {
            if (participant.email === currentUser.email) {
              return {
                email: participant.email,
                timeSpend: timeElapsed,
              };
            }
            return participant;
          });

        await updateDoc(docRef, {
          participants: updatedParticipants,
        });
      }
    }

    window.onbeforeunload = null;
  };

  const handleLeaveProject = async () => {
    if (!leaving && currentUser && project) {
      setIsLeaving(true);

      try {
        const querySnapshot = await getProjectData(id);

        if (!querySnapshot.empty) {
          const projectDocRef = querySnapshot.docs[0].ref;
          const projectData = querySnapshot.docs[0].data() as Project;

          if (projectData.authorId === currentUser.uid) {
            console.log('Jesteś twórcą projektu, nie możesz go opuścić');
            return;
          }
          const updatedParticipants: Participant[] = projectData.participants.filter(
            (participant: Participant) => participant.email !== currentUser.email
          );

          await updateDoc(projectDocRef, {
            participants: updatedParticipants,
          });
          console.log('Użytkownik opuścił projekt');
          fetchProject();

        } else {
          console.error('This project does not exist');
        }
      } catch (error) {
        console.error('ERROR DURING LEAVING THE PROJECT: ', error);
      }
      setIsLeaving(false);
    }
  };

  const handleJoinProject = async () => {
    if (joining || !currentUser || !project) {
      return;
    }

    setIsJoining(true);

    try {
      const querySnapshot = await getProjectData(id);

      if (querySnapshot.empty) {
        console.error('Projekt o podanym ID nie istnieje');
        return;
      }

      const projectDocRef = querySnapshot.docs[0].ref;
      const projectData = querySnapshot.docs[0].data() as Project;

      if (projectData.authorId === currentUser.uid) {
        console.log('Jesteś już twórcą tego projektu.');
        return;
      }

      const participants: Participant[] = projectData.participants
        ? [...projectData.participants]
        : [];
      const currentUserParticipant = participants.find(
        (participant) => participant.email === currentUser.email
      );

      if (!currentUserParticipant) {
        participants.push({ email: currentUser.email!, timeSpend: 0 });
      }

      await updateDoc(projectDocRef, {
        participants: participants,
      });

      console.log('Użytkownik dołączył do projektu');
      fetchProject();

    } catch (error) {
      console.error('Błąd podczas dołączania do projektu:', error);
    } finally {
      setIsJoining(false);
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const userEmail = currentUser?.email;

  const isParticipant =
    currentUser &&
    project.participants &&
    project.participants.find((participant) => participant.email === userEmail);

  const isAuthor = currentUser && project.authorId === currentUser.uid;

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Wrapper>
      <section className=" text-white p-4 mt-5 lg:w-4/5 mx-auto relative">
      <div className='absolute left-0 top-0 w-full h-full bg-zinc-800 -z-10 opacity-60'></div>
        <div className="w-full text-right absolute right-5 top-5 z-10">
          <button
            onClick={handleGoBack}
            className="text-white  rounded-full p-3 lg:bg-lime-600 lg:hover:bg-indigo-700 focus:outline-none transition-colors bg-indigo-600 hover:bg-indigo-800 "
          >
            <AiOutlineArrowLeft size={20} />
          </button>
        </div>
        <div className="lg:flex">
          <div className="lg:w-1/2 lg:pr-4">
            <div className="relative">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-green-500 opacity-50"></div>
            </div>
            <h2 className="text-2xl font-bold m-4 text-center">{project.name}</h2>
            <h4 className="my-4 flex items-center text-xl">
              <AiOutlineProject className="text-xl mr-2  text-lime-500" />
              Description:
            </h4>
            <p className="my-4">{project.description}</p>

            {isAuthor || isParticipant ? (
              <>
                <h4 className="mb-4 flex items-center text-xl">
                  <BsClock className="text-lime-500 text-xl mr-2" /> Time spend:
                  <span className="ml-2 font-bold tracking-widest">
                    {' '}
                    {formatTime(timeElapsed)}
                  </span>
                </h4>
                {!isRunning ? (
                  <button
                    onClick={handleStart}
                    className="transition-colors w-full lg:w-3/5 xl:w-2/5 mb-6 text-xl px-10 py-2 border border-indigo-600 text-white shadow-md hover:bg-indigo-700"
                  >
                    Start
                  </button>
                ) : (
                  <button
                    onClick={handleStop}
                    className="transition-colors w-full lg:w-3/5 xl:w-2/5  mb-6 text-xl px-10 py-2 bg-red-500 text-white shadow-md hover:bg-red-700"
                  >
                    Stop
                  </button>
                )}
                {isParticipant && !isAuthor && (
                  <button
                    onClick={handleLeaveProject}
                    className="transition-colors block w-full lg:w-3/5 xl:w-2/5 text-xl px-10 py-2 border border-red-500 text-white shadow-md hover:bg-red-700"
                  >
                    Leave project
                  </button>
                )}
              </>
            ) : (
              <>
                {!isParticipant ? (
                  <button
                    onClick={handleJoinProject}
                    className="px-10 py-3 bg-green-600 text-white shadow-md hover:bg-green-700"
                  >
                    Join project!
                  </button>
                ) : null}
              </>
            )}
          </div>
          <div className="w-1/2  lg:pl-4 hidden lg:block">
            <h3 className="font-bold text-xl">Participants:</h3>
            <ul>
              {project.participants.map((participant) => (
                <li key={participant.email} className="flex items-center">
                  <AiOutlineUser className="mr-2 text-xl text-lime-500" />
                  {participant.email}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {isParticipant && <Comments projectId={project.id} />}
      </section>
    </Wrapper>
  );
};

export default ProjectDetails;
