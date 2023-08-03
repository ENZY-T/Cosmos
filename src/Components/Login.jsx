import axios from 'axios'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import {serverUrl} from '../GlobalData/Global'
import Classes from '../Styles/login.module.scss'
import XButton from './StyledComponents/XButton'
import {ThirdPartyLogins} from '../Services/ThirdPartyLogins'
import {setIsLogged, setUser} from "../Store/Slices/UserSlice";
import {setAlertMsg} from "../Store/Slices/AppStateSlice";


//Login component
const Login = (props) => {
    //#region Hooks and states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const history = useHistory()

    // Redux store calls
    const dispatch = useDispatch()

    //#endregion

    const submit = (e) => {
        e.preventDefault()

        //Authentication
        axios
            .post(serverUrl + '/api/auth/login', {email: email, password: password}, {withCredentials: true})
            .then(async (res) => {
                const isOK = res.status === 200
                //On success login
                if (isOK) {
                    dispatch(setAlertMsg('Login Success !'))
                    setRedirect(true)
                }
            }).catch(err => {
                dispatch(setAlertMsg(err.message))
                dispatch(setIsLogged(false))
                setRedirect(false)
            })
    }

    // Fetching the logged user back
    const fetchUser = async () => {
        await axios
            .get(`${serverUrl}/api/auth/user`, {
                withCredentials: true, headers: {
                    'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                    res.status === 200 && dispatch(setUser(res.data))
                }
            ).catch(err => {
                console.log(err.message)
            })
    }

    //redirect to Home if login successful
    if (redirect) {
        history.push('/')
    }
    return (<div>
        <main className={Classes.main}>
            <form className={Classes.form} onSubmit={submit}>
                <div className={Classes.bg}/>
                <div className={Classes.bg2}/>
                <div className={Classes.btnLayer}>
                    <Link to='/'>
                        <button type='button' className='fas fa-times'/>
                    </Link>
                </div>
                <h3>Sign in</h3>
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
                <XButton className={Classes.btnLogin} invisible={'false'} type='submit'>
                    Sign in
                </XButton>
                <ThirdPartyLogins setSuccess={setRedirect}/>
                <div className={Classes.textReg}>
                    Haven't signed up? <Link to='/register'>Register</Link>{' '}
                </div>
            </form>
        </main>
    </div>)
}
export default Login
