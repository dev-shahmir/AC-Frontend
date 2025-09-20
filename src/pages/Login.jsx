import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEye, AiFillEyeInvisible, AiOutlineKey, AiOutlineMail } from 'react-icons/ai';
import instance from '../utils/axios';

function Login({ setAllowAccess }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post('/admin/login', formData);
      const { token } = response.data; // Extract token from response

      // Store token securely
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', 'true');

      // Notify success and grant access
      toast.success('Login successful!', { position: 'top-right', autoClose: 2000 });
      setAllowAccess(true);

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.message ;
      toast.error(errorMessage, { position: 'top-right', autoClose: 1000 });
    }
  };

  return (
    <section className="flex justify-center items-center min-h-[80vh] w-full p-4">
    <div className="max-w-md w-full bg-white shadow-md rounded-2xl border border-gray-200 p-4 sm:p-6">
      <form onSubmit={handleLogin} className="space-y-6">
        <h2 className="text-2xl sm:text-4xl font-semibold text-center">Login now!</h2>
        
        {/* Email Input */}
        <div className="relative">
          <label className="block w-full">
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                required
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-full focus:outline-none focus:border-green-500"
              />
              <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </label>
        </div>

        {/* Password Input */}
        <div className="relative">
          <label className="block w-full">
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
                required
                className="w-full pl-10 pr-12 py-2 sm:py-3 border border-gray-300 rounded-full focus:outline-none focus:border-green-500"
              />
              <AiOutlineKey className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {passwordVisible ? (
                  <AiFillEye className="w-5 h-5" />
                ) : (
                  <AiFillEyeInvisible className="w-5 h-5" />
                )}
              </button>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 sm:py-3 px-4 text-base sm:text-lg font-medium text-white bg-green-500 hover:bg-green-600 rounded-full transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  </section>
  );
}

export default Login;
