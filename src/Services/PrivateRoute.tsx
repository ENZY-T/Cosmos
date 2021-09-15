import React from 'react'
import { Redirect, Route } from 'react-router'
import { RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '../Store/RootStore'

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ ...rest }) => {
  const isAuth = useSelector<AppState, boolean>((state) => state.loggingReducer)

  // Fetch and check whether the user is a admin
  // ;(async () => {
  //     let isMounted = true;
  //     await axios
  //         .get(serverUrl + '/api/auth/user', {withCredentials: true})
  //         .then((res) => {
  //             isMounted && res.status === 200 && setAuth(true)
  //         })
  //         .catch((error) => {
  //             console.log(error.message)
  //         })
  //     return isMounted = false
  // })()

  console.log(isAuth)
  if (!isAuth) {
    return <Redirect to='/' />
  } else {
    return <Route {...rest} />
  }
}

export default PrivateRoute
