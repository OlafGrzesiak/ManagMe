import type { User } from "../models/User";

const USERS_KEY = "managme_users";
const LOGGED_USER_KEY = "managme_logged_user";

class UserService {
  private initializeUsers() {
    const users: User[] = [
      {
        id: "1",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
      },
      {
        id: "2",
        firstName: "Jan",
        lastName: "Developer",
        role: "developer",
      },
      {
        id: "3",
        firstName: "Anna",
        lastName: "DevOps",
        role: "devops",
      },
    ];

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(users[0]));
  }

  getAllUsers(): User[] {
    const data = localStorage.getItem(USERS_KEY);
    if (!data) {
      this.initializeUsers();
      return this.getAllUsers();
    }
    return JSON.parse(data);
  }

  getLoggedUser(): User {
    const data = localStorage.getItem(LOGGED_USER_KEY);
    if (!data) {
      this.initializeUsers();
      return this.getLoggedUser();
    }
    return JSON.parse(data);
  }
}

export const userService = new UserService();
