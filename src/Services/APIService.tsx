import axios, { AxiosResponse } from 'axios'
import { serverUrl } from '../GlobalData/Global'

export interface IProps {
  endpoint: string
  body: null | {}
  setData: null | ((data: [any]) => void)
  setError: (error: boolean) => void
  setPending: (error: boolean) => void
}

export const PostAPI = async (props: IProps) => {
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

export const PutAPI = async (props: IProps) => {
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
export const GetAPI = async (props: IProps) => {
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

export const DelAPI = async (props: IProps) => {
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
