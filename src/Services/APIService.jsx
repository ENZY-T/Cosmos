import axios from 'axios'
import {serverUrl} from '../GlobalData/Global'

export const PostAPI = async (props) => {
    ;(async () => {
        props.setPending(true)
        await axios
            .post(serverUrl + props.endpoint, props.body)
            .then((response) => {
                if (response.status === 200) alert('Success')
                alert('Success')
                response.data && props.setData && props.setData(response.data)
                props.setPending(false)
            })
            .catch((error) => {
                alert('Error: ' + error.message)
                //Error Handling => make a alerting box later
                props.setError(error)
                props.setPending(false)
            })
    })()
}

export const PutAPI = async (props) => {
    ;(async () => {
        props.setPending(true)
        await axios
            .post(serverUrl + props.endpoint, props.body)
            .then((response) => {
                if (response.status === 200) alert('Success')
                alert('Success')
                props.setPending(false)
            })
            .catch((error) => {
                alert('Error: ' + error.message)
                //Error Handling => make a alerting box later
                props.setError(error)
                props.setPending(false)
            })
    })()
}

//#region GET
export const GetAPI = async (props) => {
    props.setPending(true)
    await axios
        .get(serverUrl + props.endpoint)
        .then((response) => {
            response.data && props.setData && props.setData(response.data)
            props.setPending(false)
        })
        .catch((error) => {
            //Error Handling => make a alerting box later
            props.setError(error)
            props.setPending(false)
        })
}
//#endregion

export const DelAPI = async (props) => {
    ;(async () => {
        props.setPending(true)
        await axios
            .delete(serverUrl + props.endpoint)
            .then((response) => {
                if (response.status === 200) alert('Success')
                alert('Success')
                props.setPending(false)
            })
            .catch((error) => {
                alert('Error: ' + error.message)
                //Error Handling => make a alerting box later
                props.setError(error)
                props.setPending(false)
            })
    })()
}
