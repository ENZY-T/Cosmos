import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import  Nav from './Components/Nav'
import AdminPanel from "./Pages/Admin_Panel";

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [navState,setNavState] = useState(true)
    const [admin,setAdmin] = useState(false) // Should be set to false(this is for Dev only)

    useEffect(()=>{
        (
            async () =>{
                const response = await fetch('http://localhost:8000/api/auth/user', {
                    headers : {'Content-Type': 'application/json'},
                    credentials : 'include',
                });
                const content = await response.json();
                setName(content.fName);
                setEmail(content.email);
            }
        )();
    },[]);

    return (
    <div className="App">
        <BrowserRouter>
            <Nav name={name} setName={setName} navState={navState} admin={admin} />

            {/*Switching only one view*/}
            <Switch>
                <Route path="/" exact component={() => <Home name={name}/>}/>
                <Route path="/home" component={() => <Home name={name}/>}/>
                <Route path='/AdminPanel' component={() => <AdminPanel admin={admin} setNavState={setNavState}/> }/>

                <main className="form-sign-in">
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={() => <Login name={name} setName={setName} setAdmin={setAdmin}/>}/>
                </main>
            </Switch>
        </BrowserRouter>
    </div>
  );
}


export default App;
