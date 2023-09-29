import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AdminPanel from "./screens/AdminPanel";
import AddVacancy from "./screens/AddVacancy";
import Vacancies from "./screens/Vacancies";

function App() {
  const pageStyle = {
    backgroundColor: "#f0f0f0",
  };
  return (
    <BrowserRouter style={pageStyle}>
      <Routes>
        <Route path="/" Component={AdminPanel}></Route>
        <Route path="/Vacancies" Component={Vacancies}></Route>
        <Route path="/AddVacancy" Component={AddVacancy}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
