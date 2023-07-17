import React, { useState, useEffect } from 'react';
import { collection, getDoc, getDocs, query, where, addDoc } from 'firebase/firestore';
import { auth, database } from '../../firebase/firebaseConfig';

interface Comment {
	id: string;
	text: string;
	author: string;
	projectId: string;
}

interface CommentsComponentProps {
	projectId: string;
}

const Comments: React.FC<CommentsComponentProps> = ({ projectId }) => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [commentInput, setCommentInput] = useState<string>('');

	const fetchComments = async () => {
		const commentsQuery = query(collection(database, 'comments'), where('projectId', '==', projectId));
		const querySnapshot = await getDocs(commentsQuery);
		const commentData: Comment[] = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			text: doc.data().text || '',
			author: doc.data().author || '',
			projectId: doc.data().projectId,
		}));
		setComments(commentData);
	};

	useEffect(() => {
		fetchComments();
	}, [projectId, comments]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const comment: Comment = {
			id: Date.now().toString(),
			text: commentInput,
			author: auth.currentUser?.email || '',
			projectId: projectId,
		};

		const commentsRef = collection(database, 'comments');
		addDoc(commentsRef, comment);
		setCommentInput('');
	};

	return (
		<div className="bg-gray-100 p-4 rounded-lg">
			<ul>
				{comments.map((comment: Comment) => (
					<li key={comment.id} className="mb-2">
						{comment.text} - {comment.author}
					</li>
				))}
			</ul>

			<form onSubmit={handleSubmit} className="mt-4">
				<input
					type="text"
					placeholder="Wpisz komentarz"
					value={commentInput}
					onChange={(e) => setCommentInput(e.target.value)}
					className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				/>
				<button
					type="submit"
					className="px-4 py-2 mt-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700"
				>
					Dodaj komentarz
				</button>
			</form>
		</div>
	);
};

export default Comments;
