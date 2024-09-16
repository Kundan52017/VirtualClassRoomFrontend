import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ClassDetail = () => {
  const { id } = useParams();
  const [classDetail, setClassDetail] = useState(null);

  useEffect(() => {
    const fetchClassDetail = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/classes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClassDetail(res.data);
    };
    fetchClassDetail();
  }, [id]);

  if (!classDetail) return <div>Loading...</div>;

  return (
    <div>
      <h2>{classDetail.name}</h2>
      <h3>Units:</h3>
      <ul>
        {classDetail.units.map((unit) => (
          <li key={unit._id}>
            <h4>{unit.name}</h4>
            <ul>
              {unit.sessions.map((session) => (
                <li key={session._id}>
                  <Link to={`/classes/${id}/units/${unit._id}/sessions/${session._id}`}>{session.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassDetail;
