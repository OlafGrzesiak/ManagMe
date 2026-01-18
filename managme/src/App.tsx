import { useEffect, useState } from "react";


type Project = {
  id: string;
  name: string;
  description: string;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
};


const PROJECTS_KEY = "managme_projects";
const ACTIVE_PROJECT_KEY = "managme_active_project";

function App() {
  const [currentUser] = useState<User>({
    id: "u1",
    firstName: "Jan",
    lastName: "Kowalski"
  });



  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);



  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editedProjectId, setEditedProjectId] = useState<string | null>(null);

 

  useEffect(() => {
    const data = localStorage.getItem(PROJECTS_KEY);
    if (data) {
      setProjects(JSON.parse(data));
    }
  }, []);


  useEffect(() => {
    const savedProjectId = localStorage.getItem(ACTIVE_PROJECT_KEY);
    if (savedProjectId) {
      setActiveProjectId(savedProjectId);
    }
  }, []);



  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      description
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));

    setName("");
    setDescription("");
  };


  const updateProject = () => {
    if (!editedProjectId) return;

    const updatedProjects = projects.map(project =>
      project.id === editedProjectId
        ? { ...project, name, description }
        : project
    );

    setProjects(updatedProjects);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));

    setEditedProjectId(null);
    setName("");
    setDescription("");
  };

  
  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));

    if (activeProjectId === id) {
      setActiveProjectId(null);
      localStorage.removeItem(ACTIVE_PROJECT_KEY);
    }
  };


  const setActiveProject = (id: string) => {
    setActiveProjectId(id);
    localStorage.setItem(ACTIVE_PROJECT_KEY, id);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ManagMe</h1>

      <p>
        Logged user:{" "}
        <strong>
          {currentUser.firstName} {currentUser.lastName}
        </strong>
      </p>

      <h2>{editedProjectId ? "Edit project" : "New project"}</h2>

      <input
        placeholder="Project name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <br /><br />

      <button
        onClick={editedProjectId ? updateProject : addProject}
      >
        {editedProjectId ? "Update" : "Add"}
      </button>

      <h2>Projects</h2>

      {projects.map(project => (
        <div
          key={project.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginTop: 10,
            background:
              activeProjectId === project.id
                ? "#eef6ff"
                : "white"
          }}
        >
          <strong>{project.name}</strong>
          <p>{project.description}</p>

          {activeProjectId === project.id && (
            <p><strong>⭐ Active project</strong></p>
          )}

          <button
            onClick={() => {
              setEditedProjectId(project.id);
              setName(project.name);
              setDescription(project.description);
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteProject(project.id)}
            style={{ marginLeft: 8 }}
          >
            Delete
          </button>

          <button
            onClick={() => setActiveProject(project.id)}
            style={{ marginLeft: 8 }}
          >
            Set active
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
