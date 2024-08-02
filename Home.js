import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, createProject } from '../services/projectService';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  const handleCreateProject = async () => {
    await createProject(newProjectTitle);
    setNewProjectTitle('');
    fetchProjects();
  };

  return (
    <div>
      <h1>Projects</h1>
      <input 
        type="text"
        placeholder="New Project Title"
        value={newProjectTitle}
        onChange={(e) => setNewProjectTitle(e.target.value)}
      />
      <button onClick={handleCreateProject}>Create Project</button>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            <Link to={`/project/${project._id}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
