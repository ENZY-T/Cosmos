import axios from 'axios'
import React, { SyntheticEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { IUserActionTypes, setLogged } from '../Store/LoggedState'
import { Dispatch } from 'redux'
import { ILoggedUserActionTypes, setLoggedUser } from '../Store/LoggedUser'
import { serverUrl } from '../GlobalData/Global'
import Classes from '../Styles/login.module.scss'
import XButton from './StyledComponents/XButton'

//Interface for Props
interface IProps {}

//Login component
const Login = (props: IProps) => {
  //#region Hooks and states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const history = useHistory()

  // Redux store calls
  const dispatch = useDispatch<Dispatch<IUserActionTypes>>()
  const dispatchLoggedUser = useDispatch<Dispatch<ILoggedUserActionTypes>>()

  //#endregion

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()

    //Authentication
    await axios
      .post(
        serverUrl + '/api/auth/login',
        { email: email, password: password },
        { withCredentials: true }
      )
      .then((response) => {
        const isOK = response.status === 200
        //On success login
        if (isOK) {
          dispatch<IUserActionTypes>(setLogged())
          setRedirect(true)
        }
      })
      .catch((error) => alert(error.message))

    // Fetching the logged user back
    await axios
      .get(`${serverUrl}/api/auth/user`, { withCredentials: true })
      .then((res) => {
        console.log(res)
        res.status === 200 && dispatchLoggedUser(setLoggedUser(res.data))
      })
  }
  //redirect to Home if login successful
  if (redirect) {
    history.push('/')
  }

  return (
    <div>
      <main className={Classes.main}>
        <form className={Classes.form} onSubmit={submit}>
          <div className={Classes.bg} />
          <div className={Classes.bg2} />
          <div className={Classes.btnLayer}>
            <button>
              <Link className='fas fa-times' to='/' />
            </button>
          </div>
          <h2>Sign in</h2>
          <input
            type='email'
            className='form-control'
            id='floatingInput'
            placeholder='Name@example.com'
            required
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            className='form-control'
            id='floatingPassword'
            placeholder='Password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <XButton className={Classes.btnLogin} invisible={false} type='submit'>
            Sign in
          </XButton>
          <div className={Classes.textReg}>
            Haven't signed up? <Link to='/register'>Register</Link>{' '}
          </div>
        </form>
      </main>
    </div>
  )
}
export default Login
