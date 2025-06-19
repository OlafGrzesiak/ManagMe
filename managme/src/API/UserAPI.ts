import type { User } from "../Models/User";

const MOCK_USERS: User[] = [
  { id: "u1", firstName: "Olaf", secondName: "Grzesiak", role: "admin" },
  { id: "u2", firstName: "Ala", secondName: "Nowak", role: "developer" },
  { id: "u3", firstName: "Piotr", secondName: "Kowalski", role: "devops" },
];

export class UserAPI {
  static getAllUsers(): User[] {
    return MOCK_USERS;
  }

  static getUserById(id: string): User | undefined {
    return MOCK_USERS.find(user => user.id === id);
  }
}
