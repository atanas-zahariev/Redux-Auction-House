import { Route, Routes } from 'react-router-dom';

import Home from './components/common/HomeComponent';
import Header from './components/common/HeaderComponents';
import Login from './auth/LoginComponent';
import Logout from './auth/LogoutComponent';
import Error from './components/common/ErrorComponent';


function App() {
  console.log('App is re-render');
  return (
    <div id="page-content">
      <Header />
      <Error />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </main>
      <footer>SoftUni &copy; 2023 React Exam</footer>
    </div>
  );
}

export default App;
