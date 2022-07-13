import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams, useLocation } from 'react-router-dom';
import { login } from '../../store/session';
import SignUpForm from './SignUpForm';
import "./loginpage.css"

const LoginForm = (props) => {

  const location = useLocation()
  console.log(location.pathname)
  const [currentPath,setCurrentPath] = useState(window.location.pathname)

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    setCurrentPath(window.location.pathname)
  }, [currentPath])

  const onLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login(email, password));
    let newdata = {}
    if (data) {
      setErrors(newdata)

      //data.forEach((error)=>{
      //let errorarray = error.split(" : ")
      //newdata[errorarray[0]] = errorarray[1]})

    }

    console.log(errors)
  };



  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/channels' />;
  }

  return (
    <div className="LoginContainer">
      {location.pathname === "/login" && <form
        className="LoginForm"
        onSubmit={onLogin}>
        <div className="login-container">
          <div>
            <h3 className="header-login">Welcome back!</h3>
            <div className="secondheader-login">We're so excited to see you again!</div>

          </div>
          <div className="LoginInputContainer">
            <div className="Logininput">
              <h5 className="emailtitle" htmlFor='email'>Email {errors.email && " - " && <span className="errors"> - {errors.email}</span>}</h5>
              <input
                className="Logintext"
                name='email'
                type='text'

                value={email}
                onChange={updateEmail}
              >
              </input>
            </div>
            <div className="PasswordInput">
              <h5 className="passwordtitle" htmlFor='password'>Password{errors.password && " - " && <span className="errors"> - {errors.password}</span>}</h5>
              <input
                className="Passwordtext"
                name='password'
                type='password'

                value={password}
                onChange={updatePassword}
              />

            </div>
            <br></br>
            <br></br>
            <button className="submitloginbutton" type='submit'>Login</button>
            <div className="signuplink">
              <div className="NeedAccount">Need an account?</div>
              <a className="registerbutton" href="/register"> Register</a>
            </div>
          </div>
        </div>
      </form>
      }
      {location.pathname==="/register" &&
      <SignUpForm />

      }
    </div>
  );
};

export default LoginForm;
