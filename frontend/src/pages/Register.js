import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    phone: ""
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Required fields missing");
      return;
    }

    


    try {
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + '/auth/register',
        form
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/user/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={submitHandler} className="shadow rounded bg-white">
        <h2 className="mb-4 text-center" style={{ color: '#73152e' }}>Register</h2>
        <div className="form-group mb-3">
          <input name="name" className="form-control" placeholder="Name" onChange={changeHandler} required />
        </div>
        <div className="form-group mb-3">
          <input name="email" className="form-control" placeholder="Email" onChange={changeHandler} required />
        </div>
        <div className="form-group mb-3">
          <input name="password" type="password" className="form-control" placeholder="Password" onChange={changeHandler} required />
        </div>
        <div className="form-group mb-3">
          <input name="dob" type="date" className="form-control" placeholder="Date of Birth" onChange={changeHandler} />
        </div>
        <div className="form-group mb-3">
          <input name="phone" className="form-control" placeholder="Phone" onChange={changeHandler} />
        </div>
        <button type="submit" className="btn btn-block w-100">Register</button>
        <div className="text-center mt-3">
          <span>Already have an account? <a href="/login">Login</a></span>
        </div>
      </form>
    </div>
  );
}
