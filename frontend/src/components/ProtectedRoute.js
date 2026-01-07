import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Get user info
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const accessToken = localStorage.getItem('accessToken');
  
  // Check if authenticated
  const isAuthenticated = !!(userInfo && accessToken);
  
  if (!isAuthenticated) {
    // Save intended destination for after login
    const currentPath = window.location.pathname;
    if (currentPath !== '/login' && currentPath !== '/register') {
      localStorage.setItem('redirectAfterLogin', currentPath);
    }
    
    alert('Please login to continue');
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;