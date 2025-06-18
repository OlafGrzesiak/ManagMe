import type { User } from "../Models/User";

const MOCK_USER: User = {
  id: "u1",
  firstName: "Olaf",
  secondName: "Grzesiak",
};

export class AuthAPI {
  static getCurrentUser(): User {
    return MOCK_USER;
  }
}
