import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BiHomeAlt,
  BiLogIn,
  BiUserPlus,
  BiLayout,
  BiLogOut,
} from 'react-icons/bi';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navLinks = [
    {
      path: '/',
      name: 'Home',
      icon: <BiHomeAlt size={20} />,
    },
    {
      path: '/login',
      name: 'Login',
      icon: <BiLogIn size={20} />,
    },
    {
      path: '/register',
      name: 'Register',
      icon: <BiUserPlus size={20} />,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <BiLayout size={20} />,
    },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-black/80 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex items-center justify-between shadow-lg sticky top-0 z-50"
    >
      {/* Logo */}
      <motion.h1
        whileHover={{ scale: 1.05 }}
        className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
      >
        EmotionAI
      </motion.h1>

      {/* Links */}
      <div className="flex items-center gap-4">

        {navLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                location.pathname === link.path
                  ? 'bg-cyan-500 text-black font-semibold'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {link.icon}
              {link.name}
            </motion.div>
          </Link>
        ))}

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-white font-semibold transition-all"
        >
          <BiLogOut size={20} />
          Logout
        </motion.button>

      </div>
    </motion.nav>
  );
}