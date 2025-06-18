import { useEffect, useState } from "react";
import { ProjectAPI } from "../API/ProjectAPI";

export function ProjectSelector() {
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(ProjectAPI.getActiveProject());

  useEffect(() => {
    setProjects(ProjectAPI.getAll());
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);
    ProjectAPI.setActiveProject(id);
  };

  return (
    <div>
      <label htmlFor="project">Wybierz projekt:</label>
      <select id="project" value={selectedId ?? ""} onChange={handleSelect}>
        <option value="" disabled>-- wybierz --</option>
        {projects.map(project => (
          <option key={project.id} value={project.id}>{project.name}</option>
        ))}
      </select>
    </div>
  );
}
