import { Route, Routes } from 'react-router-dom';
import AuthLayout from './components/auth/layout';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminFeatures from './pages/admin-view/features';
import AdminProducts from './pages/admin-view/products';
import AdminOrders from './pages/admin-view/order';
import ShoppingLayout from './components/shopping-view/layout';
import NotFound from './pages/not-found';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingListing from './pages/shopping-view/listing';
import ShoppingAccount from './pages/shopping-view/account';
import ShoppingCheckout from './pages/shopping-view/checkout';
import CheckAuth from './components/common/check-auth';
import UnauthPage from './components/unauth-page';

function App() {
  const isAuthenticated = false;
  // const user = { name: 'girish', role: 'admin' };
  const user = null;
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path='/' element={<ShoppingLayout />}>
          <Route path='home' element={<ShoppingHome />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
        </Route>
        <Route
          path='/auth'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route
          path='/admin'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='features' element={<AdminFeatures />} />
          <Route path='orders' element={<AdminOrders />} />
          <Route path='products' element={<AdminProducts />} />
        </Route>
        <Route path='/unauth-page' element={<UnauthPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
