import { useContext, useRef } from 'react';
import classes from './ForgotPasswordForm.module.css';
import AuthContext from '../../store/auth-context'
import { useHistory } from 'react-router-dom';


const ForgotPasswordForm = () => {

  const history = useHistory()



  const authCtx = useContext(AuthContext)

  const newPasswordInputRef = useRef()

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredNewPassword = newPasswordInputRef.current.value

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBEeTJNjYSv2U4nLEusfH345rXuo98Bn14',{
      method:'POST',
      body:JSON.stringify({
        idToken:authCtx.token,
        password:enteredNewPassword,
        returnSecureToken:false
      }),
      headers:{
        'content-type':"application/json"
      }
    }).then((res) => {
      alert('Password changed successfully')
      history.replace('/')

    })

  }


  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
