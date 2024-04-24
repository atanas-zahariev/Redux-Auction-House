import { Route, Routes } from 'react-router-dom';

import Home from './components/common/HomeComponent';
import Header from './components/common/HeaderComponents';
import Login from './auth/LoginComponent';
import Logout from './auth/LogoutComponent';
import Error from './components/common/ErrorComponent';
import Register from './auth/RegisterComponent';
import Catalog from './components/common/catalog/CatalogComponent';
import Details from './components/common/details/DetailsComponent';
import UserClosedOffers from './components/common/closed-offers/UserClosedOffersComponent';
import Edit from './components/action/EditItemComponent';




function App() {
  console.log('App is re-render');
  return (
    <div id="page-content">
      <Header />
      <Error />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Register />} />
          <Route path='/closed' element={<UserClosedOffers />} />
        </Routes>
      </main>
      <footer>SoftUni &copy; 2024 React Redux</footer>
    </div>
  );
}

export default App;
