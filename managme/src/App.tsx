import { useEffect, useState } from "react";
import type { User } from "./models/User";
import { userService } from "./services/UserService";
import "./App.css";

function App() {
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const allUsers = userService.getAllUsers();
    const currentUser = userService.getLoggedUser();

    setUsers(allUsers);
    setLoggedUser(currentUser);
  }, []);

  if (!loggedUser) {
    return <div style={{ padding: 20 }}>Ładowanie...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>ManagMe</h1>

      <div style={{ marginBottom: 20 }}>
        <strong>Zalogowany użytkownik:</strong>{" "}
        {loggedUser.firstName} {loggedUser.lastName} ({loggedUser.role})
      </div>

      <h2>Lista użytkowników</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} – {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
