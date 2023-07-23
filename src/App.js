import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/loginform/LoginForm";
import Users from "./pages/Users";
import Protected from "./components/privateRoute/PrivateRoute";
import Header from "./components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Protected />}> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          {/* <Route exact path='/editUser/:id' element={<EditUsers/>}/> */}
        {/* </Route> */}

        <Route exact path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
