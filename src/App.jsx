import React, {useEffect} from 'react'
import './App.scss'
import axios from 'axios'
import {setIsLogged, setUser} from './Store/Slices/UserSlice'
import {useDispatch, useSelector} from 'react-redux'
import Nav from './Components/Nav'
import {BrowserRouter, Switch} from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import AdminPanel from './Pages/Admin_Panel'
import PrivateRoute from './Services/PrivateRoute'
import Home from './Pages/Home'
import {Route} from 'react-router'
import {serverUrl} from './GlobalData/Global'
import Footer from './Components/Footer'
import LoaderSpinner from './Components/Loader-Spinner'
import ViewNew from './Pages/ViewNew'
import LiveEditorNew from './Pages/Live-Editor-New'
import StaticPageHost from './Pages/StaticPageHost'
import StaticHostContextProvider from './Context/StaticHostContext'
import AlertModal from "./Components/AlertModal";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import ProjectDetailsPage from "./Pages/ProjectDetailsPage";

function App() {
    //Hooks
    const isUserLogged = useSelector(state => state.userState.isLogged)
    const loggedUser = useSelector(state => state.userState.user)
    const dispatch = useDispatch()

    useEffect(() => {
        // Fetching the logged user back
        ;(async () => await axios
            .get(serverUrl + '/api/auth/user', {withCredentials: true})
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setIsLogged(true))
                    dispatch(setUser(res.data))
                } else {
                    dispatch(setIsLogged(false))
                }
            }).catch(err => {
                dispatch(setIsLogged(false))

            }))()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const theme = createTheme({
        palette: {
            mode: 'dark', // Set the theme type to 'dark'
        },
    });

    return (<div className='App'>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                {/*region StaticPages*/}
                <StaticHostContextProvider>
                    <Nav/>
                    <Route path='/cosmos/' component={StaticPageHost}/>

                    <Route path='/' exact component={Home}/>
                </StaticHostContextProvider>
                {/*endregion*/}

                {/*<Route path='/projects/:id' exact component={ViewNew}/>*/}
                <Route path='/projects/:id' exact component={ProjectDetailsPage}/>
                <PrivateRoute path='/admin/liveeditor/:id' component={LiveEditorNew}/>

                <Switch>
                    <Route
                        path='/login'
                        exact
                        component={() => (<>
                                <Login/>
                                <Home/>
                            </>)}
                    />
                    <Route
                        path='/register'
                        exact
                        component={() => (<>
                                <Register/>
                                <Home/>
                            </>)}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute path='/AdminPanel' component={() => <AdminPanel/>}/>
                    <Footer/>
                </Switch>
            </BrowserRouter>
            <LoaderSpinner isPending={false}/>
            <AlertModal/>
        </ThemeProvider>
        </div>)
}

export default App
