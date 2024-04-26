import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { selectAuthError } from './slices/authSlice';
import { selectItemsError } from './slices/itemsSlice';

import Login from './components/auth/LoginComponent';
import Logout from './components/auth/LogoutComponent';
import Register from './components/auth/RegisterComponent';

import Home from './components/common/HomeComponent';
import Header from './components/common/HeaderComponents';
import Error from './components/common/ErrorComponent';
import Catalog from './components/common/catalog/CatalogComponent';
import Details from './components/common/details/DetailsComponent';
import UserClosedOffers from './components/common/closed-offers/UserClosedOffersComponent';

import Edit from './components/action/EditItemComponent';




function App() {
  const authError = useSelector(selectAuthError);
  const itemsError = useSelector(selectItemsError);
  const error = itemsError || authError;

  return (
    <div id="page-content">
      <Header />
      {error && <Error error={error}/>}
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
