import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import Home from './pages/storefront/Home.jsx';
import About from './pages/storefront/About.jsx';
import Services from './pages/storefront/Services.jsx';
import Cards from './pages/storefront/Cards.jsx';
import CartPage from './pages/storefront/CartPage.jsx';
import Checkout from './pages/storefront/Checkout.jsx';
import Testimonials from './pages/storefront/Testimonials.jsx';
import Login from './pages/Admin/Login.jsx';
import DashboardLayout from './components/admin/DashboardLayout';
import CardManager from './components/admin/CardManager';
import TestimonialManager from './components/admin/TestmonialManager';
import NotificationManager from './components/admin/NotificationManager';
import PurchaseManager from './components/admin/PurchaseManager';
import { CartProvider } from './context/CartContext.jsx';
import Shop from './pages/storefront/Shop.jsx';
import CardDescription from './components/storefront/CardDescription.jsx';
import Dashboard from './pages/Admin/dashboard.jsx';
import FreshCardForm from './components/storefront/FreshCardForm.jsx';
import NonFreshCardForm from './components/storefront/NonFreshCardForm';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gray-900">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cards/:type" element={<Cards />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path='/desc/:id' element={<CardDescription />} />
            <Route path="/admin/dashboard" element={<Dashboard />}>
              <Route path="cards" element={<CardManager />} />
              <Route path="testimonials" element={<TestimonialManager />} />
              <Route path="notifications" element={<NotificationManager />} />
              <Route path="purchases" element={<PurchaseManager />} />
              <Route path="*" element={<h2 className='text-2xl text-white'>Welcome to Dashboard</h2>} />
            </Route>
            <Route path="/FreshCard" element={<FreshCardForm />} />
            <Route path="/NonFreshCard" element={<NonFreshCardForm />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </CartProvider>
  );
}

export default App;