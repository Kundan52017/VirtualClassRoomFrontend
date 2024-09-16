import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LectureDetail = () => {
  const { classId, unitId, sessionId, lectureId } = useParams();
  const [lecture, setLecture] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchLecture = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/lectures/${lectureId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLecture(res.data);
    };

    const fetchComments = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/comments/${lectureId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(res.data);
    };

    fetchLecture();
    fetchComments();
  }, [lectureId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post(`${process.env.REACT_APP_API_URL}/comments/${lectureId}`, { content: newComment }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNewComment('');
    fetchComments();
  };

  if (!lecture) return <div>Loading...</div>;

  return (
    <div>
      <h2>{lecture.title}</h2>
      <p>{lecture.content}</p>

      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit}>
        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default LectureDetail;
