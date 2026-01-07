import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (!userInfo) {
      navigate('/login');
      return;
    }
    
    if (userInfo.role !== 'admin') {
      alert('Access denied. Admin only.');
      navigate('/');
      return;
    }
    
    setUser(userInfo);
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      // In real app, you'd have admin endpoints
      // For now, we'll simulate data
      setStats({
        totalUsers: 150,
        totalProducts: 45,
        totalOrders: 320,
        recentUsers: [
          { name: 'John Doe', email: 'john@example.com', joined: '2024-01-15' },
          { name: 'Jane Smith', email: 'jane@example.com', joined: '2024-01-14' },
          { name: 'Bob Wilson', email: 'bob@example.com', joined: '2024-01-13' }
        ]
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
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
    <div className="admin-dashboard">
      {/* Admin Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">Admin Dashboard</span>
          <div className="d-flex align-items-center">
            <span className="text-light me-3">Welcome, {user?.name}</span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2">
            <div className="list-group">
              <button className="list-group-item list-group-item-action active">
                Dashboard
              </button>
              <button className="list-group-item list-group-item-action">
                Users Management
              </button>
              <button className="list-group-item list-group-item-action">
                Products
              </button>
              <button className="list-group-item list-group-item-action">
                Orders
              </button>
              <button className="list-group-item list-group-item-action">
                Settings
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9 col-lg-10">
            <h2 className="mb-4">Dashboard Overview</h2>
            
            {/* Stats Cards */}
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="card bg-primary text-white">
                  <div className="card-body">
                    <h5 className="card-title">Total Users</h5>
                    <h2>{stats.totalUsers}</h2>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="card bg-success text-white">
                  <div className="card-body">
                    <h5 className="card-title">Total Products</h5>
                    <h2>{stats.totalProducts}</h2>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="card bg-warning text-dark">
                  <div className="card-body">
                    <h5 className="card-title">Total Orders</h5>
                    <h2>{stats.totalOrders}</h2>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="card bg-info text-white">
                  <div className="card-body">
                    <h5 className="card-title">Revenue</h5>
                    <h2>$12,450</h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Users Table */}
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Recent Users</h5>
              </div>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Joined Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentUsers.map((user, index) => (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.joined}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">
                            View
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            Block
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}