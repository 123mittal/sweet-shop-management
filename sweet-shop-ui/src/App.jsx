import { Routes,Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/SignUp"
import { Admin } from "./pages/Admin"
import { AdminLogin } from "./pages/AdminLogin"
import AdminProtectedRoute from "./AdminProtectedRoute";
function App() {

  return (
    <>
  <Navbar/>
  <Routes>
     <Route path="/" element={<Home />} /> 
     <Route path = "/login" element={<Login/>} />
     <Route path="/signup" element={<SignUp />} />
     <Route path="/admin/login" element={<AdminLogin />} />
     <Route path="/admin" element={<AdminProtectedRoute>
        <Admin />
      </AdminProtectedRoute>
    }
  />  </Routes>
    </>
  )
}

export default App
