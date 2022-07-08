import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signuppage.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [month, setMonth] = useState('1')
  const [day, setDay] = useState(1)
  const [year, setYear] = useState(1940)
  const [birthday, setBirthday] = useState('1940-1-1')

  const user = useSelector(state => state.session.user);
  const months = [{ 1: "January" }, { 2: "February" }, { 3: "March" }, { 4: "April" }, { 5: "May" }, { 6: "June" }, { 7: "July" }, { 8: "August" }, { 9: "September" }, { 10: "October" }, { 11: "November" }, { 12: "December" }]
  const days = []
  const years = [];
  const currentyear = new Date()
  console.log(birthday)


  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setBirthday(`${year}-${month}-${day} `)

    const data = await dispatch(signUp(username, email, password, birthday));
    if (data) {
      setErrors(data)
    }
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
        <div>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
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
        <div>
          <label>Date of Birth</label>
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
        </div>
      </form>

  );
};

export default SignUpForm;
