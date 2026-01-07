import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const { data } = await API.get('/auth/me');
        if (data.success) {
          setUser(data.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response?.status === 401) {
          // Token expired or invalid
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('rememberedEmail');
    
    // Optional: Call backend logout endpoint
    // API.post('/auth/logout');
    
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">User Dashboard</h3>
            <button className="btn btn-light btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <div className="mb-3">
                <div className="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center" 
                     style={{ width: '120px', height: '120px' }}>
                  <span className="text-white display-4">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <h4>{user?.name}</h4>
              <p className="text-muted">{user?.email}</p>
              <span className={`badge ${user?.role === 'admin' ? 'bg-danger' : 'bg-success'}`}>
                {user?.role?.toUpperCase()}
              </span>
            </div>
            
            <div className="col-md-8">
              <h5>Account Information</h5>
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">Account Status</h6>
                      <p className="card-text">
                        {user?.isActive ? (
                          <span className="text-success">✅ Active</span>
                        ) : (
                          <span className="text-danger">❌ Inactive</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">Member Since</h6>
                      <p className="card-text">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h5>Quick Actions</h5>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-primary">Edit Profile</button>
                  <button className="btn btn-outline-secondary">Order History</button>
                  <button className="btn btn-outline-success">Wishlist</button>
                  <button className="btn btn-outline-info">Settings</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}