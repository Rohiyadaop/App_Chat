import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../frontend2/src/pages/Login';
import Register from '../../frontend2/src/pages/Register';
import Dashboard from '../../frontend2/src/pages/Dashboard';
import Navbar from '../../frontend2/src/components/Navbar';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}
