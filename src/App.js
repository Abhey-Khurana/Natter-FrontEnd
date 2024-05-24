import './static/App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Register from "./pages/register.jsx"
import Login from "./pages/login.jsx";
import Chat from "./pages/chat.jsx"
import SetAvatar from './pages/SetAvatar.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/setAvatar' element={<SetAvatar />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
