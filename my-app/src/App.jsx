import { Route, Routes } from 'react-router-dom';

import Home from './components/common/HomeComponent';
import Header from './components/common/HeaderComponents';
import Login from './auth/LoginComponent';
import { AuthProvider } from './context/AuthContext';
import Logout from './auth/LogoutComponent';




function App() {
  console.log('App is re-render');
  return (
    <AuthProvider>
      <div id="page-content">
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </main>
        <footer>SoftUni &copy; 2023 React Exam</footer>
      </div>
    </AuthProvider>
  );
}

export default App;
