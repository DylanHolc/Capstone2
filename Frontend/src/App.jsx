import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './Homepage'
import MyNavbar from './Navbar'
import Footer from './Footer'
import YugiohCards from './yugioh/YugiohCards'
import YugiohCard from './yugioh/YugiohCard'
import YugiohSearch from './yugioh/YugiohSearch'
import MagicCards from './magic/MagicCards'
import MagicCard from './magic/MagicCard'
import MagicSearch from './magic/MagicSearch'
import PokemonCards from './pokemon/PokemonCards'
import PokemonCard from './pokemon/PokemonCard'
import PokemonSearch from './pokemon/PokemonSearch'
import Login from './users/Login'
import Logout from './users/Logout'
import Profile from './users/Profile'
import Register from './users/Register'
import EditProfile from './users/EditProfile'
import ChangePassword from './users/ChangePassword'
import DeleteProfile from './users/DeleteProfile'
import Cart from './users/Cart'
import OrderConfirmation from './users/OrderConfirmation'
import Cookies from 'js-cookie'
import './styles/App.css'



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (Cookies.get('username')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <div className='content'>
      <BrowserRouter>
        <MyNavbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/:username/edit" element={<EditProfile />} />
          <Route path="/:username/password" element={<ChangePassword />} />
          <Route path="/:username/delete" element={<DeleteProfile setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/yugioh/cards" element={<YugiohCards />} />
          <Route path="/yugioh/cards/:id" element={<YugiohCard />} />
          <Route path="/yugioh/search/:term" element={<YugiohSearch />} />
          <Route path="/pokemon/cards" element={<PokemonCards />} />
          <Route path="/pokemon/cards/:id" element={<PokemonCard />} />
          <Route path="/pokemon/search/:term" element={<PokemonSearch />} />
          <Route path="/mtg/cards" element={<MagicCards />} />
          <Route path="/mtg/cards/:id" element={<MagicCard />} />
          <Route path="/mtg/search/:term" element={<MagicSearch />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;