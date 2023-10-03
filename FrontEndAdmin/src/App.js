import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AdminPanel from "./screens/AdminPanel";
import AddUser from "./screens/AddUser";



function App() {
  const pageStyle = {
    backgroundColor: "#f0f0f0",
  };
  return (
    <BrowserRouter style={pageStyle}>
      <Routes>
        <Route path="/" Component={AdminPanel}></Route>
        <Route path="/AddUser" Component={AddUser}></Route>        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
