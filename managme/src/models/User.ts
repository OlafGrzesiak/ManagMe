export type UserRole = "admin" | "devops" | "developer";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};
