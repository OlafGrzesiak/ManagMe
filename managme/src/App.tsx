import { AuthAPI } from './API/AuthAPI';
import { ProjectSelector } from "./Components/ProjectSelector";

function App() {
  const user = AuthAPI.getCurrentUser();

  return (
    <div>
      <h1>Witaj, {user.firstName} {user.secondName} </h1>
    </div>
  );
}

export default App;
