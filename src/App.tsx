import React, { useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { ILoggedUserActionTypes, setLoggedUser } from './Store/LoggedUser'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { IUserActionTypes, setLogged } from './Store/LoggedState'
import Nav from './Components/Nav'
import { BrowserRouter, Switch } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import AdminPanel from './Pages/Admin_Panel'
import PrivateRoute from './Services/PrivateRoute'
import Home from './Pages/Home'
import { Route } from 'react-router'
import { serverUrl } from './GlobalData/Global'
import Footer from './Components/Footer'
import Loader from './Components/Loader'
import View from './Pages/View'
import LiveEditor from './Pages/LiveEditor'

function App() {
  //Hooks
  const dispatch = useDispatch<Dispatch<IUserActionTypes>>()
  const dispatchLoggedUser = useDispatch<Dispatch<ILoggedUserActionTypes>>()

  useEffect(() => {
    // Fetching the logged user back
    ;(async () =>
      await axios
        .get(serverUrl + '/api/auth/user', { withCredentials: true })
        .then((res) => {
          res.status === 200 &&
            dispatch<IUserActionTypes>(setLogged()) &&
            dispatchLoggedUser(setLoggedUser(res.data))
        }))()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='App'>
      <BrowserRouter>
        <Nav />
        {/*Switching only one view*/}

        <Route path='/' exact component={() => <Home />} />
        <Route path='/projects/:id' exact component={View} />
        <Route path='/admin/liveeditor/:id' component={LiveEditor} />
        <Switch>
          <Route path='/login' exact component={() => <Login />} />
          <Route path='/register' exact component={Register} />
        </Switch>
        <Switch>
          <PrivateRoute path='/AdminPanel' component={() => <AdminPanel />} />
          <Footer />
        </Switch>
      </BrowserRouter>
      <Loader isPending={false} />
    </div>
  )
}

export default App
