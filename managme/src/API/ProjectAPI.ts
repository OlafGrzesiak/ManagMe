import type { Project } from '../Models/Project';

const STORAGE_KEY = 'projects';

export class ProjectAPI {
  static getAll(): Project[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static getById(id: string): Project | undefined {
    return this.getAll().find(project => project.id === id);
  }

  static create(project: Project): void {
    const projects = this.getAll();
    projects.push(project);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  static update(updatedProject: Project): void {
    const projects = this.getAll().map(project =>
      project.id === updatedProject.id ? updatedProject : project
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  static delete(id: string): void {
    const projects = this.getAll().filter(project => project.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
  static setActiveProject(id: string) {
    localStorage.setItem(ACTIVE_KEY, id);
  }

  static getActiveProject(): string | null {
    return localStorage.getItem(ACTIVE_KEY);
  }
}

const ACTIVE_KEY = 'activeProject';

