import React from 'react'
import Classes from '../Styles/proj_card.module.scss'
import { serverUrl } from '../GlobalData/Global'
import { Link } from 'react-router-dom'

const ProjCard = (props: {
  id: string
  title: string
  cover: string
  tagline: string
}) => {
  return (
    //Link to the View page
    <Link to={`/projects/${props.id}`}>
      <div className={Classes.projCard}>
        {/*Image*/}
        <img className={Classes.cover} src={serverUrl + props.cover} alt='' />
        {/*Overlay*/}
        <div className={Classes.title}>{props.title}</div>
        <div className={Classes.overlay} />
        <div className={Classes.tagline}>{props.tagline}</div>
      </div>
    </Link>
  )
}

export default ProjCard
