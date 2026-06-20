import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/ContextAPI';
import Swal from 'sweetalert2';

export const Logout = () => {
  const { removeToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Clear the authentication state/token
    removeToken();

    // 2. Fire the elegant SweetAlert2 notification
    Swal.fire({
      title: 'Logged Out Successfully',
      text: 'You have been securely signed out of your account.',
      icon: 'success',
      timer: 2000, // Auto-closes after 2 seconds
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonText: 'Great',
      confirmButtonColor: '#4f46e5', // Beautiful indigo primary matching your theme
      customClass: {
        popup: 'rounded-3xl p-5 shadow-xl border border-gray-100',
      }
    }).then(() => {
      // 3. Redirect the user to the login screen after the alert closes
      navigate('/login', { replace: true });
    });
  }, [removeToken, navigate]);

  // Render a clean loading state placeholder while the alert runs
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-indigo-600 mb-3"></div>
      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Securing session termination...</p>
    </div>
  );
};

export default Logout;