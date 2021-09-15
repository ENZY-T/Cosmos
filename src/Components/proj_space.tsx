import React, { useEffect, useState } from 'react'
import Classes from '../Styles/proj_space.module.css'
import ProjCard from './proj_card'
import axios from 'axios'
import { serverUrl } from '../GlobalData/Global'
import { IProject } from '../Services/Dtos'

const ProjSpace = () => {
  const [projects, setProjects] = useState<Array<IProject>>(
    Array.of<IProject>()
  )

  useEffect(() => {
    projectFetcher()
  }, [])

  // Projects fetching function
  const projectFetcher = async () => {
    await axios
      .get(serverUrl + '/api/cards/projects')
      .then((res) => setProjects(res.data))
      .catch((error) => {
        // showAlert(error.status, error.message)
        setProjects([])
      })
  }

  //injecting the json object data to the project card component
  const projCardList = projects.map((item, id) => {
    return (
      <ProjCard
        key={id}
        id={item.id}
        title={item.title}
        cover={item.mediaURIs[0]}
        tagline={item.tagline}
      />
    )
  })

  return (
    <div className={Classes.projSpace}>
      <div className={Classes.title}>Our Process...</div>
      {projCardList}
    </div>
  )
}

export default ProjSpace
