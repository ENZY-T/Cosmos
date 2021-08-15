import React, {SyntheticEvent, useState} from 'react';
import { Redirect } from 'react-router-dom';

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async(e:SyntheticEvent) => {
    e.preventDefault();
    await fetch('http://localhost:8000/api/auth/register', {
      method : 'POST',
      headers : {'Content-Type': 'application/json'},
      body: JSON.stringify({
        Name: name,
        Email: email,
        Password: password
      })
    });
    setRedirect(true);
  }
  //add Some Loaders while awaiting the response
  if(redirect){
    return <Redirect to="/login"/>
  }

  return (
    <div>
        <form onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>
          <input className="form-control" placeholder="Name" required autoFocus
            onChange={e=>setName(e.target.value)}
          />
          <input type="email" className="form-control" id="floatingInput" placeholder="Name@example.com" required
            onChange={e=>setEmail(e.target.value)}
          />
          <input type="password" className="form-control" placeholder="Password" required
            onChange={e=>setPassword(e.target.value)}
          />
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    </div>
  );
};

export default Register;