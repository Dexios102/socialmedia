import React, { useState, useContext } from 'react';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { loginUser } from './actions'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { BsFillLockFill } from "react-icons/bs";


const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login_success } = useContext(UserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "", password: ""
    },
    onSubmit: async (values) => {
      setLoading(true)
      let data = await loginUser(values)
      if (data) {
        login_success(data);
        navigate('/');
      } else {
        setErr(true);
        setLoading(false);
      }
    }
  })

  return (
    <section>
      <Navbar />
      <div className="container" id="main__container">
        <div className="row">
          <div className="col-md-4 mx-auto">
            <form onSubmit={formik.handleSubmit} id="login__content" className="card p-2" style={{ background: "#fff" }}>
              <h1 className='loginpage_text' style={{ textAlign: "left" }}>
                Login
              </h1>
              <input type="text" className="form-control" id="login__input" name="username" placeholder="Username"
                onChange={formik.handleChange} value={formik.values.username} />
              <input type="password" className="form-control mt-2 mb-3" id="login__input" name="password" placeholder="Password" onChange={formik.handleChange}
                value={formik.values.password} />
              {err && <p className="text-danger"> Invalid Credentials </p>}
              <button type="submit" id="logoutpage_button" className="btn__primary">
                {loading ? "Loging In" : "LOGIN"}
              </button>

            </form>
            <Link href to="/signup" id="link__text" className="form-label"><u>Create a New Account</u></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;