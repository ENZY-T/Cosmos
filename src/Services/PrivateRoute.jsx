import React, {useEffect, useState} from 'react'
import {Redirect, Route} from 'react-router'
import axios from 'axios'
import {serverUrl} from '../GlobalData/Global'
import GearLoader from '../Components/GearLoader'

const PrivateRoute = ({...rest}) => {
    // const isAuth = useSelector<AppState, boolean>((state) => state.loggingReducer)
    const [admin, setAdmin] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    // Fetch and check whether the user is a admin
    const fetchData = async () => {
        await axios
            .get(serverUrl + '/api/auth/user', {withCredentials: true})
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.role === 'admin') {
                        setAdmin(true)
                    } else {
                        setAdmin(false)
                    }
                    setLoading(false)
                }
            })
            .catch(() => {
                setAdmin(false)
                setLoading(false)
            })
    }

    if (loading) {
        return <GearLoader isPending={loading}/>
    }

    if (!admin) {
        return <Redirect to='/'/>
    } else {
        return <Route {...rest} />
    }
}

export default PrivateRoute
