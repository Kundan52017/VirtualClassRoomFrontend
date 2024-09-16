import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClassList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/classes`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClasses(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div>
      <h2>Available Classes</h2>
      <ul>
        {classes.map((cls) => (
          <li key={cls._id}>
            <Link to={`/classes/${cls._id}`}>{cls.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
