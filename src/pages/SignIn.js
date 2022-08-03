import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

function SignIn() {
  const { login } = useContext(AuthContext);
    const [loginValue, setLoginValue] = useState({
        email : "",
        password : "",
    })

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(loginValue);
      try{
          const response = await axios.post("http://localhost:3000/login", loginValue);
          console.log(response.data.accessToken);
          // if(response.status === 201 || response.status === 200) {
          //     history.push("/signin")
          // }
          login(response.data.accessToken);
      } catch (e){
          console.error(e);
      }

  }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit}>
          <label>Name:
              <input
                  type="email"
                  name="username"
                  value={loginValue.email}
                  onChange={(e) => {
                      setLoginValue({
                          ...loginValue,
                          email: e.target.value
                      })
                  }}
              />
          </label>
          <label>Password:
              <input
                  type="password"
                  name="password"
                  value={loginValue.password}
                  onChange={(e) => {
                      setLoginValue({
                          ...loginValue,
                          password: e.target.value
                      })
                  }}
              />
          </label>
        <button type="submit">Inloggen</button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;