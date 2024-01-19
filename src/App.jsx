import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './contexts/auth.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AllEvents from './pages/AllEvents'
import MyEvents from './pages/MyEvents.jsx'
import MyAccount from './pages/MyAccount.jsx'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/gather-sphere-frontend' element={<Home />}></Route>
          <Route path='/gather-sphere-frontend/login' element={<Login />}></Route>
          <Route path='/gather-sphere-frontend/signup' element={<SignUp />}></Route>
          <Route path='/gather-sphere-frontend/allevents' element={<AllEvents />}></Route>
          <Route path='/gather-sphere-frontend/myevents' element={<MyEvents />}></Route>
          <Route path='/gather-sphere-frontend/myaccount' element={<MyAccount />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
