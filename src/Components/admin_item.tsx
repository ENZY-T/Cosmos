import React from 'react'
import Classes from '../Styles/Admin_item.module.css'
import { IAdminItem } from '../Services/Dtos'
import { serverUrl } from '../GlobalData/Global'

interface IProps {
  adminItem: IAdminItem
  delItem: (deletingItem: IAdminItem) => void
}

const AdminItem = (props: IProps) => {
  //Casting Multiple CSS classes
  const classText = []
  classText.push(Classes.text)

  return (
    <div className={Classes.adminItem}>
      <img src={serverUrl + props.adminItem.mediaURIs[0]} alt='' />
      <div className={Classes.dataPlate}>
        <div className={classText.join(' ')}>{props.adminItem.title}</div>
        <div>{`Created on : ${props.adminItem.createdDate}`}</div>
      </div>
      <div className={Classes.tagline}>{props.adminItem.tagline}</div>
      <div className={Classes.btnPanel}>
        <i className='fas fa-edit' />
        <i
          onClick={() => props.delItem(props.adminItem)}
          className='fas fa-trash-alt'
        />
      </div>
    </div>
  )
}

export default AdminItem
