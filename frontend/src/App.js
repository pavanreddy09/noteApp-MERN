import "./App.css";
import DisplayNotes from "./components/displayNotes";
import Header from "./components/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Editnote from "./components/editnote";
import Createnote from "./components/createnote";
import LoginForm from "./components/loginform";
import RegisterPage from "./components/userRegisterPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" Component={DisplayNotes} exact />
          <Route path="/create" Component={Createnote} />
          <Route path="/edit/:id" Component={Editnote} />
          <Route path="/login" Component={LoginForm} />
          <Route path="/register" Component={RegisterPage} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
