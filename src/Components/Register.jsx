import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {serverUrl} from '../GlobalData/Global'
import XButton from './StyledComponents/XButton'
import Classes from '../Styles/Register.module.scss'
import {ThirdPartyLogins} from "../Services/ThirdPartyLogins";

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        await fetch(serverUrl + '/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                Name: name,
                Email: email,
                Password: password,
            }),
        })
        setRedirect(true)
    }
    //add Some Loaders while awaiting the response
    if (redirect) {
        return <Redirect to='/login'/>
    }

    //add Some Loaders while awaiting the response
    if (loggedIn) {
        return <Redirect to='/'/>
    }

    return (
        <div>
            <main className={Classes.main}>
                <form className={Classes.form} onSubmit={submit}>
                    <div className={Classes.bg}/>
                    <div className={Classes.bg2}/>
                    <div className={Classes.btnLayer}>
                        <button>
                            <Link className='fas fa-times' to='/'/>
                        </button>
                    </div>
                    <h3>Register Here</h3>
                    <input
                        className='form-control'
                        placeholder='Name'
                        required
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='email'
                        className='form-control'
                        id='floatingInput'
                        placeholder='Name@example.com'
                        required
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
                        Join Us
                    </XButton>
                    <ThirdPartyLogins setSuccess={setLoggedIn}/>
                    <div className={Classes.textReg}>
                        Have a account? <Link to='/login'>Login</Link>{' '}
                    </div>
                </form>
            </main>
        </div>
    )
}

export default Register
