import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  // Check if user exists and is admin
  if (!userInfo) {
    return <Navigate to="/login" />;
  }
  
  if (userInfo.role !== 'admin') {
    alert('Access denied. Admin privileges required.');
    return <Navigate to="/" />;
  }
  
  return children;
};

export default AdminRoute;