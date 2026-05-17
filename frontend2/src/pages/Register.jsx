// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api';

// export default function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await api.register({ name, email, password });
//       localStorage.setItem('token', data.token);
//       navigate('/dashboard');
//     } catch (err) {
//       alert(err.message || 'Registration failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input value={name} onChange={(e) => setName(e.target.value)} required />
//         </div>
//         <div>
//           <label>Email</label>
//           <input value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div>
//           <label>Password</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }






import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BiUser, BiEnvelope, BiLockAlt } from 'react-icons/bi';
import api from '../api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await api.register({ name, email, password });

      localStorage.setItem('token', data.token);

      navigate('/dashboard');
    } catch (err) {
      alert(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8"
      >
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-white mb-2">
            Create Account
          </h2>

          <p className="text-gray-300">
            Register to continue
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <BiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 text-xl" />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 outline-none focus:border-cyan-400 transition-all"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <BiEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 text-xl" />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 outline-none focus:border-cyan-400 transition-all"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <BiLockAlt className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 text-xl" />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 outline-none focus:border-cyan-400 transition-all"
            />
          </motion.div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg transition-all shadow-lg"
          >
            Register
          </motion.button>
        </form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-gray-300"
        >
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}