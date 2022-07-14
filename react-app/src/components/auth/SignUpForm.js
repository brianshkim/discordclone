import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signuppage.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [month, setMonth] = useState('1')
  const [day, setDay] = useState(1)
  const [year, setYear] = useState(1940)
  const [birthday, setBirthday] = useState('')

  const user = useSelector(state => state.session.user);
  const months = [{ 1: "January" }, { 2: "February" }, { 3: "March" }, { 4: "April" }, { 5: "May" }, { 6: "June" }, { 7: "July" }, { 8: "August" }, { 9: "September" }, { 10: "October" }, { 11: "November" }, { 12: "December" }]
  const days = []
  const years = [];
  const currentyear = new Date()
  console.log(birthday)


  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();


    const data = await dispatch(signUp(username, email, password, birthday));
    let newdata = {}
    if (data) {

      data.forEach((error)=>{
      let errorarray = error.split(" : ")
      newdata[errorarray[0]] = errorarray[1]})

    }
    setErrors(newdata)
    console.log(errors)

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateBirthday = (e) => {
    setBirthday(e.target.value);
  };

  for (let i = 2019; i >= 1870; i--) {
    years.push(i)
  }

  for (let i = 1; i <= 31; i++) {
    days.push(i)
  }

  const onselectMonth = async (e) => {
    let index = e.target.selectedIndex;
    console.log(index)
    var optionElement = e.target.childNodes[index].value
    setMonth(optionElement)

  }

  const onselectDay = async (e) => {

    let index = e.target.selectedIndex;
    console.log(index)
    var optionElement = e.target.childNodes[index].innerHTML
    setDay(optionElement)

  }

  const onselectYear = async (e) => {

    let index = e.target.selectedIndex;
    console.log(index)
    var optionElement = e.target.childNodes[index].innerHTML
    setYear(optionElement)

  }


  if (user) {
    return <Redirect to='/' />;
  }

  return (

    <form
      className="SignupForm"
      onSubmit={onSignUp}>
      <div className="SignupContainer">

        <h3 className="Signup-login">Create an account</h3>

        <div className="SignupInputcontainer">
          <div className="signupInput">
            <h5 className="signuptitle">Email {errors.email && " - " && <span className="errors"> - {errors.email}</span>}</h5>
            <input
              className="signuptext"
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className="signupInput">
            <h5 className="signuptitle">Username {errors.username  && " - " && <span className="errors"> - {errors.username}</span>}</h5>
            <input
              className="signuptext"
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>


          <div className="signupInput">
            <h5 className="signuptitle">Password {errors.password  && " - " && <span className="errors"> - {errors.password}</span>}</h5>
            <input
              className="signuptext"
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>

          <div className="signupInput">
            <h5 className="signuptitle">Birthday {errors.birthday && " - " && <span className="errors"> - {errors.birthday}</span>}</h5>
            <input
              className="signuptext birthdaytext"
              type='date'

              onChange={updateBirthday}
              value={birthday}
            ></input>
          </div>
          <div className="privatepolicy">
            "By Clicking Sign Up, you agree to Ioniq's Terms of Service and Privacy Policy."
          </div>
          <br></br>
          <button className="submitloginbutton" type='submit'>Sign Up</button>
          <br></br>
          <NavLink to='/login' exact={true} id="loginregister" activeClassName='active'>
            Already have an account?
          </NavLink>
          <div className="signuplink">

           <a className="registerbutton" href="/">Main Page </a>

            </div>
          {/* <div>

        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
        </div>*/}
          {/*<div>
            <h5 className="signuptitle"> Date of Birth</h5>
            <select id="months"
              onChange={onselectMonth}>
              {months.map((month) => (
                <option key={Object.keys(month)[0]} value={Object.keys(month)[0]}>{month[Object.keys(month)[0]]}</option>
              ))}
            </select>
            <select id="days"
              onChange={onselectDay}>
              {days.map((day) => (
                <option key={day} value={day}>{day} </option>
              ))}
            </select>

            <select id="year"
              onChange={onselectYear}>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <button type='submit'>Sign Up</button>
        </div>*/}
        </div>
      </div>

    </form>

  );
};

export default SignUpForm;
