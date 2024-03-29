import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';

import Home from './pages/Home'
import Product from './pages/Product'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import store from './redux/store';

const queryClient = new QueryClient()

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="products">
                <Route path="category/:categoryName" element={<Home />} />
                <Route path="id/:productId" element={<Product />} />
              </Route>
              <Route path="auth">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </CookiesProvider>

  );
}

export default App;
