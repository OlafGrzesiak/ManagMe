import type { User } from "../Models/User";

const MOCK_USER: User = {
  id: "u1",
  firstName: "Olaf",
  secondName: "Grzesiak",
  role: "admin"
};

export class AuthAPI {
  static getCurrentUser(): User {
    return MOCK_USER;
  }
}
