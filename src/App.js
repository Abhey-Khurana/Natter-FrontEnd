import './static/App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Register from "./pages/register"
import Login from "./pages/login";
import Chat from "./pages/chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
