import { useEffect, useState } from "react";

/* ===== Rozgrzewka z TypeScript ===== */
type Project = {
  id: string;
  name: string;
  description: string;
};

const STORAGE_KEY = "managme_projects";

function App() {
  /* ===== Stan aplikacji ===== */
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editedProjectId, setEditedProjectId] = useState<string | null>(null);

  /* ===== READ ===== */
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      setProjects(JSON.parse(data));
    }
  }, []);

  /* ===== CREATE ===== */
  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      description
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedProjects)
    );

    setName("");
    setDescription("");
  };

  /* ===== UPDATE ===== */
  const updateProject = () => {
    if (!editedProjectId) return;

    const updatedProjects = projects.map(project =>
      project.id === editedProjectId
        ? { ...project, name, description }
        : project
    );

    setProjects(updatedProjects);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedProjects)
    );

    setEditedProjectId(null);
    setName("");
    setDescription("");
  };

  /* ===== DELETE ===== */
  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(
      p => p.id !== id
    );
    setProjects(updatedProjects);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedProjects)
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ManagMe</h1>

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
            marginTop: 10,
            padding: 10
          }}
        >
          <strong>{project.name}</strong>
          <p>{project.description}</p>

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
            style={{ marginLeft: 10 }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
