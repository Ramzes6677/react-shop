import './App.scss'
import { Route, Routes } from 'react-router'
import MainPage from './pages/main'
import FavoritePage from './pages/favorites'
import CartPage from './pages/cart'
import ProductPage from './pages/product'
import { AdminPage } from './pages/admin'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  )
}

export default App
