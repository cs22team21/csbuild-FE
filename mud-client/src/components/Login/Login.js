import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import './login.scss';

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [isRegister, setRegister] = useState(false);

  function handleChange(e) {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "password1") {
      setPassword1(e.target.value);
    }
  }

  function toggleRegister() {
    if (isRegister) {
      setRegister(false);
    } else {
      setRegister(true);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    let endpoint = "";
    let creds = {};
    if (isRegister) {
      endpoint = `${props.backendUrl}/api/registration/`;
      creds = { username: username, password1: password, password2: password1 };
      return axios
        .post(`${endpoint}`, creds, { "Content-Type": "application/json" })
        .then(res => {
          localStorage.setItem("key", res.data.key)
          alert('Registration Successful!  Please login to continue')
        });
    } else {
      endpoint = `${props.backendUrl}/api/login/`;
      creds = { username: username, password: password };
      return axios
        .post(`${endpoint}`, creds, { "Content-Type": "application/json" })
        .then(res => {
          localStorage.setItem("key", res.data.key)
          props.history.push('/game')
        })
        .catch(err => {
          console.log(err.response)
        });
    }
  }

  console.log(props);

  return (
    <React.Fragment>
      <div className="login-back"></div>
      <section className="login-page">
        <div>
          <button onClick={toggleRegister}>
            {isRegister ? "Login" : "SignUp"}
          </button>
        </div>
        <h1>{isRegister ? "Register" : "Login"}</h1>

        <form className="login-inputs" onSubmit={handleSubmit}>
          <div className='spacing'>
            <label>Username:  </label>
            <input value={username} onChange={handleChange} name="username" />
          </div>
          <div className='spacing'>
            <label>Password:  </label>
            <input value={password} onChange={handleChange} name="password" type="password" />
          </div>
          {isRegister && (
            <div className='spacing'>
              <label>Verify password:  </label>
              <input
                value={password1}
                onChange={handleChange}
                name="password1"
                type="password"
              />
            </div>
          )}
          <div className='submit-button'>
            <button type="Submit">Submit</button>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
};

export default withRouter(Login);
